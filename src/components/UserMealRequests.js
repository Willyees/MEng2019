import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/styles';
import board from "../res/chopping_board_chopped.png";
import $ from 'jquery';


/**
 * middleman that will get the whole data and transform into a suitable data structure for child.
 * User usr is used as map key.
 * Component used to both create functionality to accept users and to show participants (based on the 'accept' prop passed)
 */

//todo have to pass meal id from parent
class UserMealRequests extends Component{
    constructor(props){
        //props: data
        super(props.data);
        this.data = new Map();
        console.log(props);
        this.handlerAcceptUser = this.handlerAcceptUser.bind(this);
    }

    handlerAcceptUser(usr, name, accepted){
        var success = false
        console.log(this.props.host, this.props.mealId)
        $.ajax({
            url: 'PHPF/acceptrequest.php',
            type: 'post',
            data : {"host_usr" : this.props.host, "username" : usr, "meal_id" : this.props.mealId, "name" : name, "accepted" : String(accepted)},
            async : false,
            success: function(){console.log("Successfully Accepted/Removed participant request"); success = true;},
            error : function() {console.log("Error in accepting/removing participant request"); success = false;},
            context : this
        });
        console.log("Success", success)
        return success
    }

    setUp(v){
        var data = new Map();
        let usr = v.usr;
        delete v.usr;
        data.set(usr, v);
        return data;
        
    }
    render(){
        return(
            <Grid container>
                {this.props.accept && 
                <Grid item container>
                    Requests to join this meal
                </Grid>
                }
            <Grid container>
                <Grid item xs>
                    {this.props.data.map((v,k) => <UserRequest data={this.setUp(v)} accept={this.props.accept} acceptf={this.handlerAcceptUser}/>)}
                    
                </Grid>
            </Grid>
            </Grid>
            
            

        );
    }
}
export default UserMealRequests;
/**
 * 
 * @param map info. key : usr
 */
class UserRequest extends Component{
    
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            disabled : false,
            visible_accepted : true,
            visible_rejected : true,
            can_accept : this.props.accept ? this.props.accept : false, //set it false if not passed accept property (false by default)
        }
        let it = props.data.keys()
        this.usr = it.next().value;
        this.name = props.data.get(this.usr).n;
        console.log(this.name);
        if(!it.next().done)
            console.log("Error - passed to the list of requests, 2 same user ids");

        this.handleUserAccepted = this.handleUserAccepted.bind(this);
    }
    
    handleUserAccepted(event, accepted){
        console.log("accepted", accepted);
        console.log(event.target);//value is not under the target. - todo check why
        var success = this.props.acceptf(this.usr, this.name, accepted)//could use the value from taget when it works
        //if success function set visibility rejectbutton = false and disabled accept = true
        if(success){
            this.setState({visible_rejected : false, disabled : true});
        }
        else{
            alert("error while setting user as partecipant to the meal")
            console.log("error while setting user as partecipant to the meal");
        }
    }

    // handleUserRejected(event){
    //     if(true){//true is return of ajax function
    //         this.setState({visible_accepted : false, disabled : true});
    //     }
    //     else{
    //         console.log("error while setting user as partecipant to the meal");
    //     }
    // }

    output(){
        //used to output the grid because foreach is only looping, not returning as it does the .map()
        var out = [];
        this.props.data.forEach((v,k) => 
        {
            out.push(Object.values(v).map((v) => <Grid item xs><a href={`/view-profile?usr=${k}`}>{v}</a></Grid> ));
        });
        return out;
    }

    render(){
        return(
        <Paper>
        <Grid container>
                {this.output()}
            {this.state.can_accept && 
            <Grid item xs>
                {this.state.visible_accepted && <Button name="accepted_btn" value={this.usr} color="primary" disabled={this.state.disabled} onClick={(e) => this.handleUserAccepted(e, true)}><DoneIcon/></Button>}
                {this.state.visible_rejected && <Button name="rejected_btn" value={this.usr} color="secondary" disabled={this.state.disabled} onClick={(e) => this.handleUserAccepted(e, false)}><CloseIcon/></Button>}
                {/*or can use FAB buttons. Dylan you have better taste, have a look!
                <Fab color="primary" size="small"><DoneIcon/></Fab>
                }<Fab color="secondary" size="small"><CloseIcon/></Fab>
                */
                }
            </Grid>
            }
        </Grid>
        </Paper>
                
        )       
    }
    
}
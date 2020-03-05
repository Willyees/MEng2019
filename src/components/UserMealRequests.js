import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/styles';
import board from "../res/chopping_board_chopped.png";

/**
 * middleman that will get the whole data and transform into a suitable data structure for child.
 * User usr is used as map key
 */

//todo have to pass meal id from parent
class UserMealRequests extends Component{
    constructor(props){
        //props: data
        super(props.data);
        this.data = new Map();
        console.log(props);
    }

    handlerAcceptUser(event){

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
                <Grid item container>
                    Requests to join this meal
                </Grid>
            <Grid container>
                <Grid item xs>
                    {this.props.data.map((v,k) => <UserRequest data={this.setUp(v)}/>)}
                    
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
        }
        let it = props.data.keys()
        this.usr = it.next().value;
        if(!it.next().done)
            console.log("Error - passed to the list of requests, 2 same user ids");

        this.handleUserAccepted = this.handleUserAccepted.bind(this);
        this.handleUserRejected = this.handleUserRejected.bind(this);
    }
    
    handleUserAccepted(event){
        console.log(this.usr);
        //ajax call to add user usign 
    }

    handleUserRejected(event){
        console.log(event.target.value);
    }

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
            <Grid item xs>
                {this.state.visible_accepted && <Button name="accepted_btn" value={this.usr} color="primary" disabled={this.state.disabled} onClick={this.handleUserAccepted}><DoneIcon/></Button>}
                {this.state.visible_rejected && <Button name="rejected_btn" value={this.usr} color="secondary" disabled={this.state.disabled} onClick={this.handleUserRejected}><CloseIcon/></Button>}
                {/*or can use FAB buttons. Dylan you have better taste, have a look!
                <Fab color="primary" size="small"><DoneIcon/></Fab>
                }<Fab color="secondary" size="small"><CloseIcon/></Fab>
                */
                }
            </Grid>
        </Grid>
        </Paper>
                
        )       
}
    
}
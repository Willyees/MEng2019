import React, {Component} from 'react';
import AppBar from '../components/AppBar.js';
import Grid from '../components/ShowMealGrid.js';
import ShowMealGrid from '../components/ShowMealGrid.js';
import $ from 'jquery';
import {formatTime} from '../helperFunctions.js';
import UserMealRequests from '../components/UserMealRequests.js';
import {getCookie, redirectIfNotLoggedIn} from '../helperFunctions.js';
import Paper from '@material-ui/core/Paper'
import board from "../res/chopping_board_chopped.png";
import { withStyles } from '@material-ui/core';
import {MapTemplateSingle} from './map'


export const joinTypeEnum = {
    HOST : 0,
    PARTICIPANT : 1,
    REQUESTEE : 2, 
    USER : 3
}

const styles = theme => ({
    root:{
        display: "flex",
        justifyContent: "space-between",
    },
    paper: {
        padding: theme.spacing(8),
        color: theme.palette.secondary.main,
        marginLeft: "12%",
        marginRight: "12%",
        marginTop: "4.5%",
        width:'75%',
        "background-image" : `url(${board})`,
        "background-size" : `contain`,
      }
});

function getParticipants(mealId){
    var data1 = [];
    $.ajax({url: 'PHPF/getparticipants.php',
            type : 'post',
            data : {"id" : mealId},
            async : false,
            success : function(out){
                var d1 = JSON.parse(out);
                d1.forEach(function(entry) {
                    var parsed = JSON.parse(entry);
                    parsed.usr = parsed.u;//add additional usr field that will be shown graphically next to the name
                    data1.push(parsed)
                });
            },
            error : () => {console.log("Error in getting the participants")}
            })
    return data1;    
}
let requests = [];
class ShowMealTemplate extends Component {
    constructor(props){
        super(props);
        redirectIfNotLoggedIn();
        const elementNames = ["id", "host", "title", "time", "date", "description", "guest_limit", "proposed_meal", "contribution", "city", "dietary", "theme", "age_range"];
        this.state = {date : new Date(),
                      mealId : -1,
                      hostId : "",
                      participantMax : 0
                      }//have to manage the date for the child component
        this.joinMeal = this.joinMeal.bind(this)
        this.getJoinType = this.getJoinType.bind(this)
	    //Get join meal requests
            var url = new URL(window.location.href);
	    var param = url.searchParams.get("meal");
        
        //load the participants
        this.participants = getParticipants(param);
        //load the requests
	    $.ajax({ url: 'PHPF/getmealrequests.php',
		    type: 'post',
		    data: {"id" : param},
		    async:false,
		    success: function(out){
                let d1 = JSON.parse(out);
			    d1.forEach(function(entry) {
                    var parsed = JSON.parse(entry);
                    parsed.usr = parsed.u;
                    requests.push(parsed)
                });
            }
	    })
    }

    isHost(){
        //add function to check that the token username checks with the db one
        var currUser = getCookie("Username")
        return currUser == this.state.hostId
    }

    joinMeal(){//callback invoked from child upon join button clicked
        console.log("JOIN MEAL invoked")
        //call ajax with user id and meal id
        var username = getCookie("Username")
        $.ajax({
            url: 'PHPF/joinmeal.php',
            type: 'post',
            data : {"meal_id" : this.state.mealId, "user_id" : username},
            success: function(){console.log("Sent request to join this meal from user"); alert("Sent request to join this meal to the host. You will get notified once accepted")},
            error : function() {console.log("Error in sending the join request to DB")}
        });
    }

    componentDidMount(){
        //Now lets add the meal data 
        //If GET parameter set, then get meal from db, if not redirect back to map page
        var url = new URL(window.location.href);
        var param = url.searchParams.get("meal");
        if(param == null || typeof(param) == undefined){
                //Redirect if no meal chosen
                console.log("not detected any meal param");
            //window.location.href = "/map";
        }
        else{
            //Lets get the meal and add it to the front end
            //Let pass param to ajax on the server and get meal details returned
            var t = this;
                $.ajax({ url: 'PHPF/getmeal.php',
            type: 'post',
            data: {"id" : param},
            async: false,
            success: t.ajaxGetMeal,
            context : t
            });
            //debug local host
            if(window.location.host == "localhost:3000"){
                var output = '{"id":"101","host":"harrypotter","title":"NEW","time":"16:47:30","date":"2020-03-27","description":"this is an informal meal to get to know new people that would like to be eaten","guest_limit":"4","proposed_meal":"make your own favorite pizza","contribution":"4.5","city":"Edinburgh","dietary":"","theme":"LOTR and loads of other thins","age_range":"[]"}';
            this.ajaxGetMeal(output);
            }

        }
    }

    isParticipant(username){
        //check if curr user is the host
        for(var index = 0; index < this.participants.length; index++){
          if(this.participants[index].u == username){
            return true;
          }
        }
        return false;
    }

    /**
     * function used to check if the user is amongst the requestees
     */
    isRequest(username){
        for(var index = 0; index < requests.length; index++){
            if(requests[index].u == username){
                return true;
            }
        }
        return false;
    }

    /**
     * used to find out what type of user is viewing the page. The child component show meal grid will use this information to show diffefrent type of join button
     */
    getJoinType(){
        var username = getCookie("Username")
        console.log(username, this.state.hostId, requests, this.participants)
        if(this.isHost()){
            console.log("Returned H")
            return joinTypeEnum.HOST;
          }
          else if (this.isParticipant(username)) {
            console.log("Returned P")

            return joinTypeEnum.PARTICIPANT;
          } 
          else if(this.isRequest(username)) {
            console.log("Returned R")

            return joinTypeEnum.REQUESTEE;
          }
          else {
            console.log("Returned U")

              return joinTypeEnum.USER;
          }
            
    }

    
    ajaxGetMeal(output){//this whole functionality could be acheived by using react states on the html elements. cleaner
        var outParsed = JSON.parse(output);
        console.log(outParsed)
        //parse time
        if(outParsed.time != "")
            outParsed.time = formatTime(outParsed.time)
        //store in the state the variables needed to be passed to child or worked upon
        this.setState({mealId : outParsed["id"], hostId : outParsed["host"], date : new Date(outParsed["date"] + " " + outParsed["time"]), image : outParsed["pic_url"], participantMax : outParsed["guest_limit"]})
        console.log(outParsed["guest_limit"]);
        for(var id in outParsed){
            if(outParsed[id] == "" || outParsed[id] == "[]"){
                let c = document.getElementById(id + "_grid")
                if(c != null){
                c.style.display = "none";
                }
                else{
                console.log("problem: null element " + id + "_grid");
                }
            }else{
                let o = document.getElementById(id) //only setting the actual value
                if(o != null){
                    o.innerHTML = outParsed[id];
                }
                else{
                    console.log("id element not present on the grids to be replaced: " + id);
                }
            }
        }
    }
    render() {
        const {classes} = this.props;
        return(
            <div>     
                <AppBar>
                </AppBar>
        <ShowMealGrid joinf={this.joinMeal} date={this.state.date} host={this.state.hostId} participants={this.participants} participantMax={this.state.participantMax} jointype={this.getJoinType()} mealId={this.state.mealId} img={this.state.image}></ShowMealGrid>
        
                {this.isHost() && 
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <UserMealRequests data={requests} accept={true} host={this.state.hostId} mealId={this.state.mealId}></UserMealRequests>
                    </Paper>
                </div>}
                <MapTemplateSingle precise={this.getJoinType() == joinTypeEnum.PARTICIPANT || this.getJoinType() == joinTypeEnum.HOST} mealId={this.state.mealId}/>
            </div>
        );
    }
}
export default withStyles(styles)(ShowMealTemplate);
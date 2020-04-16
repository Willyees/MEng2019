import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../components/AppBar.js';
import Grid from '../components/ShowMealGrid.js';
import ShowMealGrid from '../components/ShowMealGrid.js';
import $ from 'jquery';
import {formatTime} from '../helperFunctions.js';
import {findDOMNode} from 'react-dom';
import UserMealRequests from '../components/UserMealRequests.js';
import {getCookie} from '../helperFunctions.js';

const styles = makeStyles(theme => ({
    root:{
        display: "flex",
        justifyContent: "space-between",
    },
    
}));

const useStyles = makeStyles(styles);

class ShowMealTemplate extends Component {
    constructor(props){
        super(props);
        const elementNames = ["id", "host", "title", "time", "date", "description", "guest_limit", "proposed_meal", "contribution", "city", "dietary", "theme", "age_range"];
        this.state = {date : new Date(),
                      mealId : -1,
                      hostId : ""}//have to manage the date for the child component
        this.joinMeal = this.joinMeal.bind(this)
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
            success: function(){console.log("Sent request to join this meal from user")},
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
            success: t.ajaxGetMeal,
            context : t
            });
            //debug local host
            if(window.location.host == "localhost:3000"){
                var output = '{"id":"101","host":"harrypotter","title":"NEW","time":"16:47:30","date":"2020-03-27","description":"this is an informal meal to get to know new people that would like to be eaten","guest_limit":"4","proposed_meal":"make your own favorite pizza","contribution":"4.5","city":"Edinburgh","dietary":"","theme":"LOTR and loads of other thins","age_range":""}';
            this.ajaxGetMeal(output);
            }
        }
    }

    ajaxGetMeal(output){//this whole functionality could be acheived by using react states on the html elements. cleaner
        var outParsed = JSON.parse(output);
        //parse time
        if(outParsed.time != "")
            outParsed.time = formatTime(outParsed.time)
        //store in the state the variables needed to be passed to child or worked upon
        console.log(this);
        this.setState({mealId : outParsed["id"], hostId : outParsed["host"], date : new Date(outParsed["date"])})

        for(var id in outParsed){
            if(outParsed[id] == ""){
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
        return(
            <div>     
                <AppBar>
                </AppBar>
                <ShowMealGrid joinf={this.joinMeal} date={this.state.date}>
                </ShowMealGrid>
                {this.isHost() && 
                <UserMealRequests data={[{n : 'alessio', s : 'williams', usr : 'harrypotter'}, {n:'michael', s: 'matano', usr: 'napier'}]} accept={true} ></UserMealRequests>
                }
            </div>
        );
    }
}

export default ShowMealTemplate;

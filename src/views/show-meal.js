import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../components/AppBar.js';
import Grid from '../components/ShowMealGrid.js';
import ShowMealGrid from '../components/ShowMealGrid.js';
import $ from 'jquery';
import {formatTime} from '../helperFunctions.js';
import {findDOMNode} from 'react-dom';
import UserMealRequests from '../components/UserMealRequests.js';
import {isHost} from '../helperFunctions.js';


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
        this.state = {date : new Date()}//have to manage the date for the child component
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
            success: t.ajaxGetMeal
            });
            //debug local host
            if(window.location.host == "localhost:3000"){
                var output = '{"id":"101","host":"harrypotter","title":"NEW","time":"16:47:30","date":"2020-03-27","description":"this is an informal meal to get to know new people that would like to be eaten","guest_limit":"4","proposed_meal":"make your own favorite pizza","contribution":"4.5","city":"Edinburgh","dietary":"","theme":"","age_range":""}';
                this.ajaxGetMeal(output);
            }
        }
    }

    ajaxGetMeal(output){
        var outParsed = JSON.parse(output);
        //parse time
        if(outParsed.time != "")
            outParsed.time = formatTime(outParsed.time)
    
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
                if(id == "date"){//date handled differently
                    this.setState({date : new Date(outParsed[id])}, () => console.log(this.state.date));
                    continue;
                }
                let o = document.getElementById(id) //only setting the actual value. I think would be better to add a label before it with whatever the text is wanted to be shwon other than the value (xes: <label>Dietary:</label><label>{value_from_DB}</label>)
                if(o != null){
                    o.innerHTML = outParsed[id];
                }
                else{
                    console.log("problem: null element " + id);
                }
            }
        }
    }

    
    render() {
        return(
            <div>     
                <AppBar>
                </AppBar>
                <ShowMealGrid date={this.state.date}>
                </ShowMealGrid>
                {isHost() && 
                <UserMealRequests data={[{n : 'alessio', s : 'williams', usr : 'harrypotter'}, {n:'michael', s: 'matano', usr: 'napier'}]} ></UserMealRequests>
                }
            </div>
        );
    }
}

export default ShowMealTemplate;

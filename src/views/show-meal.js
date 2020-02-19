import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../components/AppBar.js';
import Grid from '../components/ShowMealGrid.js';
import ShowMealGrid from '../components/ShowMealGrid.js';
import $ from 'jquery';
import {formatTime} from '../helperFunctions.js';


const styles = makeStyles(theme => ({
    root:{
        display: "flex",
        justifyContent: "space-between",
    },
    
}));

function ajaxGetMeal(output){
    
    var outParsed = JSON.parse(output);
    //parse time
    if(outParsed.time != "")
        outParsed.time = formatTime(outParsed.time)
    console.log(outParsed.time);
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
const useStyles = makeStyles(styles);

class ShowMealTemplate extends Component {
    constructor(props){
        super(props);
        const elementNames = ["id", "host", "title", "time", "date", "description", "guest_limit", "proposed_meal", "contribution", "city", "dietary", "theme", "age_range"];
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
            $.ajax({ url: 'PHPF/getmeal.php',
		type: 'post',
		data: {"id" : param},
		success: ajaxGetMeal
        });
        //debug local host
        if(window.location.host == "localhost:3000"){
            var output = '{"id":"101","host":"harrypotter","title":"NEW","time":"16:47:30","date":"2020-03-27","description":"this is an informal meal to get to know new people that would like to be eaten","guest_limit":"4","proposed_meal":"make your own favorite pizza","contribution":"4.5","city":"Edinburgh","dietary":"","theme":"","age_range":""}';
            ajaxGetMeal(output);
        }
	}
    }
    render() {
        return(
            <div>     
                <AppBar>
                </AppBar>
                <ShowMealGrid>
                </ShowMealGrid>
            </div>
        );
    }
}

export default ShowMealTemplate;

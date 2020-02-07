import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../components/AppBar.js';
import Grid from '../components/ShowMealGrid.js';
import ShowMealGrid from '../components/ShowMealGrid.js';
import $ from 'jquery';


const styles = makeStyles(theme => ({
    root:{
        display: "flex",
        justifyContent: "space-between",
    },
    // grid:{
    //     marginRight: "-15px",
    //     marginLeft: "-15px",
    //     width: "auto"
    // }
    
}));

const useStyles = makeStyles(styles);

class ShowMealTemplate extends Component {
    constructor(props){
        super(props);
        //harcoded id names. If modifying in the showmealgrid, HAVE to modify here as well
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
        //debug object to be used in local development
        var output = '{"id":"101","host":"harrypotter","title":"NEW","time":"16:47:30","date":"2020-03-27","description":"this is an informal meal to get to know new people that would like to be eaten","guest_limit":"4","proposed_meal":"make your own favorite pizza","contribution":"4.5","city":"Edinburgh","dietary":"","theme":"","age_range" : ""}';

        //debug for local host (no on the server)
        var outParsed = JSON.parse(output);
        if(window.location.host == "localhost:3000"){
            for(var id in outParsed){
                if(outParsed[id] == ""){
                    let c = document.getElementById(id + "_grid")
                    if(c != null)
                        c.style.display = "none";
                    else
                        console.log("problem: null element " + id + "_grid");
                }else{
                    let o = document.getElementById(id) //only setting the actual value. I think would be better to add a label before it with whatever the text is wanted to be shwon other than the value (xes: <label>Dietary:</label><label>{value_from_DB}</label>)
                    if(o != null)
                        o.innerHTML = outParsed[id];
                    else
                        console.log("problem: null element " + id);
                }
            }
        }
        else{
        //Lets get the meal and add it to the front end
        //Let pass param to ajax on the server and get meal details returned
            $.ajax({ url: 'PHPF/getmeal.php',
            type: 'post',
            data: {"id" : param},
            success: function(output) {
                var outParsed = JSON.parse(output);
                document.getElementById("title").innerHTML = outParsed["title"];
                document.getElementById("date").innerHTML = outParsed["date"];
                document.getElementById("time").innerHTML = outParsed["time"];
                document.getElementById("city").innerHTML = outParsed["city"];
                document.getElementById("proposed_meal").innerHTML = outParsed["propsed_meal"];
                document.getElementById("theme").innerHTML = "Theme: " + outParsed["theme"];
                document.getElementById("age_range").innerHTML = "Age Range: " + outParsed["age_range"];
                document.getElementById("dietary").innerHTML = "Dietary: " + outParsed["dietary"];
                document.getElementById("contribution").innerHTML = "Contribution: " + outParsed["contribution"];
                document.getElementById("guest_limit").innerHTML = "Guest Limit: " + outParsed["guest_limit"];
                document.getElementById("description").innerHTML = outParsed["description"];
            }
            });
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

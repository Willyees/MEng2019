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
        //Lets get the meal and add it to the front end
        //Let pass param to ajax on the server and get meal details returned
            $.ajax({ url: 'PHPF/getmeal.php',
		type: 'post',
		data: {"id" : param},
		success: function(output) {
			var outParsed = JSON.parse(output);
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
});
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

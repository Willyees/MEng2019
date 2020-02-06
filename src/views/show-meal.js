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
    }

    componentDidMount(){
       //Now lets add the meal data 
       //If GET parameter set, then get meal from db, if not redirect back to map page
	var url = new URL(window.location.href);
	var param = url.searchParams.get("meal");
	if(param == null || typeof(param) == undefined){
		//Redirect if no meal chosen
		window.location.href = "/map";
	}
	else{
            //Lets get the meal and add it to the front end
	    //Let pass param to ajax on the server and get meal details returned
            $.ajax({ url: 'PHPF/getmeal.php',
		type: 'post',
		data: {"id" : param},
		success: function(output) {
	            alert(output);
		    var outParsed = JSON.parse(output);
		   alert(outParsed["id"]);
		    document.getElementById("title").innerHTML = outParsed["title"];
		    document.getElementById("date").innerHTML = outParsed["date"];
		    document.getElementById("time").innerHTML = outParsed["time"];
		    document.getElementById("city").innerHTML = outParsed["city"];
		    document.getElementById("proposed_meal").innerHTML = outParsed["propsed_meal"];
		    document.getElementById("theme").innerHTML = outParsed["theme"];
		    document.getElementById("age_range").innerHTML = outParsed["age_range"];
		    document.getElementById("dietary_requirements").innerHTML = outParsed["dietary"];
		    document.getElementById("expected_contribution").innerHTML = outParsed["contribution"];
		    document.getElementById("guest_limit").innerHTML = outParsed["guest_limit"];
		    document.getElementById("description").innerHTML = outParsed["description"];
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

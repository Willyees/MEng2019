import React, {Component} from 'react';
import {useState} from 'react';
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import {MuiPickersUtilsProvider, KeyboardDatePicker, DatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import 'date-fns'
import $ from 'jquery'
import { makeStyles } from '@material-ui/core/styles';

function getCookie(cookieName) {
    var name = cookieName + "=";
    var decC = decodeURIComponent(document.cookie);
    var tmp = decC.split(';');
    for(var i = 0; i <tmp.length; i++) {
        var c = tmp[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


class CreateMealTemplate extends Component { //this is more create meal. have to change class names

    constructor(props){
        super(props);
        this.state = {
            title : "",
            description: "",
            city : "",
            dietary : "",
            date : new Date().toDateString(), //date and time will need to use a graphical calendar. At the moment are visualised for debug purposes
            time : new Date().toLocaleTimeString(),
            proposed_meal : "",
            expected_contribution : 0.0,
            guest_limit : 0,
            age_range : "", //have to discuss how to implement the range. 2 different fields? single slider that can set min and max?
            suggested_theme : "",
        }
	var un = getCookie("Username");
	console.log(un);
        if(typeof(un) === "undefined" || un === null || un.length < 3){
		window.location.href = "/";
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.debugFillFields = this.debugFillFields.bind(this);

    }
    
    handleDate(date_){ //date is handled differently (not like an event)
        console.log("handle data");
        this.setState({date : date_});
        console.log(this.state.date + "state");
    }

    onChange(event){//every time an element is modified from the user this function is called. So it is possible to perform checks for each keystroke if needed
        console.log("on change");
        console.log(event.target.value);
        this.setState({[event.target.name] : event.target.value});
    }

    onSubmit(event) {
        console.log("on submit");
        //add to this fucntion the connection to the DB. can retreive all the inputs values from 'this.state'. care: they are stored all as strings at the moment (JS dynamic types)
        const {title, description, city} = this.state;
        console.log(this.state);
        event.preventDefault();
	 $.ajax({ url: 'PHPF/createmeal.php',
            type: 'post',
            data: {"data" : this.state},
            success: function(output) {
                if(output == "DONE"){
                    window.location.href = "/map"; //change to map page
                }
                else{
                    alert("Sorry, an unknown error occured.");
                }
            }
        });

    }

    //DEBUG ONLY

    debugFillFields() {
        console.log("debug full fields");
        this.setState({title: "new Meal", description : "this is an informal meal to get to know new people that would like to be eaten", city : "Edinburgh",
        dietary : "none", date : new Date().toDateString(), time : new Date().toLocaleTimeString(), proposed_meal : "make your own favorite pizza", expected_contribution : "4.5", guest_limit : "4", 
        age_range: "none", suggested_theme : "none"});
    }

    render() {
        var submitDisabled = false;
        var values = Object.values(this.state);
        for(var v of values){
            if(v.length == 0){
                submitDisabled = true;
            }
        }
        console.log();
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={this.debugFillFields}>
                    Debug fill fields
                </Button>
                Create a Meal Event
            <div>
            <p />
            </div>
            <form onSubmit={this.onSubmit}> 
                <div>
                    {/* id: <name_id>_cm; cm stands for create meal */}
                    <TextField name="title" id="title_cm" onChange={this.onChange} value={this.state.title} type="text" 
                    label="Title"/>
                </div>
                <p />
                <div>
                    <TextField multiline name="description" id="description_cm" onChange={this.onChange} value={this.state.description} type="text"
                    label="Description" variant="outlined"/>
                </div>
                <div>
                    <TextField name="city" id="city_cm" onChange={this.onChange} value={this.state.city} type="text" label="City" 
                    />
                </div>
                <div>
                    <TextField name="dietary" id="dietary_cm" onChange={this.onChange} value={this.state.dietary} label="Dietary requirements"/> {/*at the moment is a text box. Once DB connection is set up, should retreive multiple choices from DB and use a <select />*/}
                </div>
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker name="date" id="date_cm" margin="normal" clearable autoOk={true} disableOpenOnEnter variant="inline" label="Date picker" format="dd/MM/yyyy"
                        value={this.state.date} onChange={this.handleDate} />
                    </MuiPickersUtilsProvider>
                </div>
                <div>
                    <TextField name="time" id="time_cm" onChange={this.onChange} value={this.state.time} type="time" label="Time"/>
                </div>
                <div>
                    <TextField name="proposed_meal" id="proposed_meal_cm" onChange={this.onChange} value={this.state.proposed_meal} type="text" label="Proposed meal" />
                </div>
                <div>
                    <TextField name="expected_contribution" id="expected_contribution_cm" onChange={this.onChange} value={this.state.expected_contribution} type="number" label="Expected contribution" />
                </div>
                <div>
                    <TextField name="guest_limit" id="gues_limit_cm" onChange={this.onChange} value={this.state.guest_limit} type="number" label="Guest Limit" min="1"/>
                </div>
                <div>
                    <TextField name="age_range" id="age_range_cm" onChange={this.onChange} value={this.state.age_range} type="range" label="Age range" min="0" max="99"/>
                </div>
                <div>
                    <TextField name="suggested_theme" id="suggested_theme_cm" onChange={this.onChange} value={this.state.age_range} type="text" label="Suggested Theme" />
                </div>
                <div>

                </div>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} type="submit" disabled={submitDisabled}>
                    Create
                </Button>
            </form>

            </div>
        );
    }
}

export default CreateMealTemplate;

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
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import { getCookie, isUserLoggedIn} from '../helperFunctions'

class CreateMealTemplate extends Component { //this is more create meal. have to change class names

    constructor(props){
        
        super(props);
        this.state = {
            values : {
                title : "",
                description: "",
                city : "",
                date : new Date().toLocaleDateString("en-US"), //date and time will need to use a graphical calendar. At the moment are visualised for debug purposes
                time : new Date().toLocaleTimeString(),
                proposed_meal : "",
                expected_contribution : 0.0,
                guest_limit : 0,
                age_range : "", //have to discuss how to implement the range. 2 different fields? single slider that can set min and max?
            },
            optional : {
                suggested_theme : "",
                dietary : "",
            },
            //visibility for extra fields
            visibility : {
                suggested_theme_vis : false,
                dietary_vis : false
            }
        }
        this.onChange = this.onChange.bind(this);
        this.onChangeOptional = this.onChangeOptional.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.debugFillFields = this.debugFillFields.bind(this);
        this.handleVis = this.handleVis.bind(this);
    }

    optional_inputs = ["dietary", "suggested_theme"];
   
    handleDate(date_){ //date is handled differently (not like an event)
	var str = date_.toString();
        console.log("handle data");
        //console.log(this.state.values.date + "state");
	var test = new Date(str).
	  toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).
	  replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
      this.setState({...this.state, values : { ...this.state.values, date : test}});
    }

    onChange(event){//every time an element is modified from the user this function is called. So it is possible to perform checks for each keystroke if needed
        console.log("on change");
        this.setState({...this.state, values : { ...this.state.values, [event.target.name] : event.target.value}}); //https://stackoverflow.com/questions/34072009/update-nested-object-with-es6-computed-property-name
    }

    onChangeOptional(event){
        console.log("on change optional");
        console.log(event.target.name + " " + event.target.value);
        this.setState({...this.state, optional : { ...this.state.optional, [event.target.name] : event.target.value}});
    }

    handleVis(event){
        //remove vis part to get the name of the field and clear it
        var name = event.target.value;
        var index = name.lastIndexOf("_");
        var stateName = name.slice(0,index);
        console.log(event.target.value +  " " + event.target.checked);
        this.setState({...this.state, visibility : {...this.state.visibility, [event.target.value] : event.target.checked }});
        //this.setState({...this.state, values : {...this.state.values, [stateName] : ""}}); //TODO: PUT THIS IN THE OTHER SET STATE
        console.log(this.state.visibility);
    }

    onSubmit(event) {
        console.log("on submit");
        //add to this fucntion the connection to the DB. can retreive all the inputs values from 'this.state'. care: they are stored all as strings at the moment (JS dynamic types)
        const {title, description, city} = this.state.values;
        var objmerged = {...this.state.values, ...this.state.optional}; //have to merge the optional and not optional object together
        console.log(this.state);
        event.preventDefault();
	 $.ajax({ url: 'PHPF/createmeal.php',
            type: 'post',
            data: {"data" : objmerged},
            success: function(output) {
                if(output == "DONE"){
                    window.location.href = "/map"; //change to map page
                }
                else{
                    alert("Sorry, an unknown error occured.");
		    alert(output);
                }
            }
        });

    }

    //DEBUG ONLY

    debugFillFields() {
        console.log("debug full fields");
        var v = {...this.state.values}; //create dummy object and then replace all the properties. After, replace the state object with the updated one
        v.title = "new Meal"; v.description = "this is an informal meal to get to know new people that would like to be eaten"; v.city = "Edinburgh";
        v.dietary = "none"; v.date = new Date().toDateString(); v.proposed_meal = "make your own favorite pizza"; v.expected_contribution = "4.5"; v.guest_limit = "4";
        v.age_range= "none"; v.suggested_theme = "none";
        this.setState({values : v});        
    }

    render() {
        var un = getCookie("Username");
        console.log(un);
        if(!isUserLoggedIn()) {
            window.location.href = "/";
            return null;
        }
        //console.log(this.optional);
        var submitDisabled = false;
        var values = Object.values(this.state.values);
        console.log(values);
        for(var v of values){
            if(v.length == 0){
                submitDisabled = true;
            }
        }
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={this.debugFillFields}>
                    Debug fill fields
                </Button>
                Create a Meal Event
            <div>
            <p />
            </div>
            <Grid container>
            <Grid item>
            <Paper>
            <form onSubmit={this.onSubmit}> 
                <Grid item>
                    {/* id: <name_id>_cm; cm stands for create meal */}
                    <TextField name="title" id="title_cm" onChange={this.onChange} value={this.state.values.title} type="text" 
                    label="Title"/>
                </Grid>
                <p />
                <Grid item>
                    <TextField multiline name="description" id="description_cm" onChange={this.onChange} value={this.state.values.description} type="text"
                    label="Description" variant="outlined"/>
                </Grid>
                <Grid item>
                    <TextField name="city" id="city_cm" onChange={this.onChange} value={this.state.values.city} type="text" label="City" 
                    />
                </Grid>

                <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker name="date" id="date_cm" margin="normal" clearable autoOk={true} disableOpenOnEnter variant="inline" label="Date picker" format="dd/MM/yyyy"
                        value={this.state.values.date} onChange={this.handleDate} />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item>
                    <TextField name="time" id="time_cm" onChange={this.onChange} value={this.state.values.time} type="time" label="Time"/>
                </Grid>
                <Grid item>
                    <TextField name="proposed_meal" id="proposed_meal_cm" onChange={this.onChange} value={this.state.values.proposed_meal} type="text" label="Proposed meal" />
                </Grid>
                <Grid item>
                    <TextField name="expected_contribution" id="expected_contribution_cm" onChange={this.onChange} value={this.state.values.expected_contribution} type="number" label="Expected contribution" />
                </Grid>
                <Grid container>
                    <Grid item xs>
                        <TextField name="guest_limit" id="gues_limit_cm" onChange={this.onChange} value={this.state.values.guest_limit} type="number" label="Guest Limit" min="1"/>
                    </Grid>
                    <Grid item xs>
                        <TextField name="age_range" id="age_range_cm" onChange={this.onChange} value={this.state.values.age_range} type="range" label="Age range" min="0" max="99"/>
                    </Grid>
                </Grid>
                <Grid item>
                    {this.state.visibility.suggested_theme_vis &&
                    <TextField name="suggested_theme" id="suggested_theme_cm" onChange={this.onChangeOptional} value={this.state.optional.suggested_theme} type="text" label="Suggested Theme" />
                    }
                </Grid>
                <Grid item>
                    {this.state.visibility.dietary_vis &&
                    <TextField name="dietary" id="dietary_cm" onChange={this.onChangeOptional} value={this.state.optional.dietary} label="Dietary requirements"/>
                    } {/*at the moment is a text box. Once DB connection is set up, should retreive multiple choices from DB and use a <select />*/}
                </Grid>

                <Button variant="contained" color="primary" startIcon={<AddIcon />} type="submit" disabled={submitDisabled}>
                    Create
                </Button>
            </form>
            </Paper>
            </Grid>

            <Grid item >
                <FormControl>
                    <FormLabel>Extra fields</FormLabel>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox value="suggested_theme_vis" checked={this.state.visibility.suggested_theme_vis} onClick={this.handleVis}></Checkbox>} label="Suggested Theme"></FormControlLabel>
                        <FormControlLabel control={<Checkbox value="dietary_vis" checked={this.state.visibility.dietary_vis} onClick={this.handleVis}></Checkbox>} label="Dietary requirements"></FormControlLabel>
                    </FormGroup>
                </FormControl>
            </Grid>
            </Grid>
            </div>
        );
    }
}

export default CreateMealTemplate;

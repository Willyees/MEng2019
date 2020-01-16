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
import $ from 'jquery';

import { makeStyles } from '@material-ui/core/styles';

class SignUpTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
            fName : "",
            lName: "",
            username: "",
            password: "",
            password_c: "",
            address_1: "",
            address_2: "",
            postcode: "",
            city: "",
            dob:  new Date().toDateString(), //date and time will need to use a graphical calendar. At the moment are visualised for debug purposes
            phone: "",
            dietary: "",
            bio: "",
            profilePic: "",
            allergens: "",
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDOB = this.handleDOB.bind(this);
    }
    
    handleDOB(date_){ //date is handled differently (not like an event)
        this.setState({dob : date_});
        console.log(this.state.dob + "state");
    }

    onChange(event){//every time an element is modified from the user this function is called. So it is possible to perform checks for each keystroke if needed
        console.log(event.target.value);
        this.setState({[event.target.name] : event.target.value});
    }

    onSubmit(event) {
        //add to this fucntion the connection to the DB. can retreive all the inputs values from 'this.state'. care: they are stored all as strings at the moment (JS dynamic types)
        const {fName, bio, city} = this.state;
        console.log(this.state);
        event.preventDefault();
         
	$.ajax({ url: 'PHPF/signup.php',
	    type: 'post',
	    data: {"data" : this.state},
	    success: function(output) {
		if(output == "DONE"){
	            window.location.href = "/" 
		}
		else if(output == 1){
		    alert("Username Already Exists");
		}
	    }
	});	
    }
    render() {
        return(
            
            <div className="signup">
                SignUp page
                <div>
                    <p />
                </div>
                <form onSubmit={this.onSubmit}> 
                    <div>
                        <TextField name="fName" id="first-name-tb" onChange={this.onChange} value={this.fName} type="text" label="First Name"/>
                    </div>
                    <div>
                        <TextField name="lName" id="last-name-tb" onChange={this.onChange} value={this.lName} type="text" label="Last Name"/>
                    </div>
                    <div>
                        <TextField name="username" id="username-tb" onChange={this.onChange} value={this.username} type="text" label="Username" />
                    </div>
                    <div>
                        <TextField name="password" type="password" id="password-tb" onChange={this.onChange} value={this.password} label="Password" />
                    </div>
                    <div>
                        <TextField name="password_c" type= "password" id="password_c-tb" onChange={this.onChange} value={this.password_c} label="Confirm Password" />
                    </div>
                    <div>
                        <TextField name="address_1" id="address_1-tb" onChange={this.onChange} value={this.address_1} type="text" label="Address Line 1" />
                    </div>
                    <div>
                        <TextField name="address_2" id="address_2-tb" onChange={this.onChange} value={this.address_2} type="text" label="Address Line 2" />
                    </div>
                    <div>
                        <TextField name="postcode" id="postcode-tb" onChange={this.onChange} value={this.postcode} type="text" label="Postcode" />
                    </div>
                    <div>
                        <TextField name="city" id="city-tb" onChange={this.onChange} value={this.city} type="text" label="City" />
                    </div>
                    <div>
                        <TextField name="country" id="country-tb" onChange={this.onChange} value={this.country} type="text" label="Country" />
                    </div>
                    <div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker name="dob" id="dobdate" margin="normal" clearable autoOk={true} disableOpenOnEnter variant="inline" label="Date of Birth" format="dd/MM/yyyy"
                            value={this.state.dob} onChange={this.handleDOB} />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div>
                        <TextField name="phone" id="phone-tb" onChange={this.onChange} value={this.phone} type="text" label="Phone Number" />
                    </div>
                    <div>
                        <TextField name="dietary" id="dietary-ddmenu" onChange={this.onChange} value={this.dietary} label="Dietary requirements"/> {/*at the moment is a text box. Once DB connection is set up, should retreive multiple choices from DB and use a <select />*/}
                    </div>
                    <div>
                        <TextField multiline name="bio" id="bio-mltb" onChange={this.onChange} value={this.bio} type="text"
                        label="Your bio" variant="outlined"/>
                    </div>
                    
                    <div>
                        <TextField name="profilepic" id="profilePic" onChange={this.onChange} value={this.profilePic} type="text" label="Where a pic should go" />
                    </div>
                    <div>
                        <TextField multiline name="allergens" id="allergens-mltb" onChange={this.onChange} value={this.allergens} type="text" label="Allergens" variant="outlined"/>
                    </div>
                    <div>

                    </div>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} type="submit">
                        Sign Up
                    </Button>
                </form>

            </div>
        );
    }
}

export default SignUpTemplate;

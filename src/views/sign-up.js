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

import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { makeStyles } from '@material-ui/core/styles';

const postcodeRegex = RegExp(/^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/);

const phoneNumberRegex = RegExp(/^((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}$/g);

//will check to see if everythings valid before sending data to db
const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    
    return valid;
};

class SignUpTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
            fName : null,
            lName: null,
            username: null,
            password: null,
            password_c: null,
            address_1: null,
            address_2: null,
            postcode: null,
            city: null,
            country: null,
            dob:  null, //date and time will need to use a graphical calendar. At the moment are visualised for debug purposes
            phone: null,
            dietary: null,
            bio: null,
            profilePic: null,
            allergens: null,
            //visibility for passwords
            isPasswordVis : true,
            isPasswordCVis : true,


            formErrors: {
                fName : "",
                lName: "",
                username: "",
                password: "",
                password_c: "",
                address_1: "",
                postcode: "",
                city: "",
                country: "",
                phone: "",
            }
        }
    }
    
    handleDOB = date_ => { //date is handled differently (not like an event)
        let formErrors = this.state.formErrors;
        formErrors.dob =
                    date_.getFullYear() >= new Date().getFullYear()
                    ? "dob can't be in current year"
                    : "";
        this.setState({formErrors, dob : date_}, () => console.log(this.state));
    };

    //using two different functions because the event received has no info related to which icon called it (so can't understand which password state to modify)
    setVisibilityPass = () =>{
        this.setState({isPasswordVis : !this.state.isPasswordVis});
    }
    setVisibilityPassC = () =>{
        this.setState({isPasswordCVis : !this.state.isPasswordCVis});
    }

    onChange = event => {//every time an element is modified from the user this function is called. So it is possible to perform checks for each keystroke if needed
        event.preventDefault();
        const { name, value} = event.target;
        let formErrors = this.state.formErrors;

        switch(name){
            case 'fName':
                formErrors.fName = 
                    value.length < 3
                    ? "minimum 3 characters required"
                    : "";
                break;
            case 'lName':
                formErrors.lName = 
                    value.length < 3 
                    ? "minimum 3 characters required"
                    : "";
                break;

            //not sure how to test the username to see if its already in db so I have left the username check for now, should go here like the others though.

            case 'password':
                formErrors.password = 
                    value.length < 6 
                    ? "minimum 6 characters required"
                    : "";
                break;
            case 'password_c':
                formErrors.password_c = 
                    value.match(this.state.password)
                    ? ""
                    : "passwords must match"
                break;
            case 'address_1':
                formErrors.address_1 =
                    value.length < 3 
                    ? "minimum 3 characters required"
                    : "";
                break;

            //address 2 not required as it is an optional field

            case 'postcode':
            formErrors.postcode = 
                postcodeRegex.test(value)
                ? ""
                : "postcode should be a uk postcode";
                break;
            case 'city':
                formErrors.city =
                    value.length < 3 
                    ? "minimum 3 characters required"
                    : "";
                break;
            case 'country':
                formErrors.country =
                    value.length < 3 
                    ? "minimum 3 characters required"
                    : "";
                break;
            
            //dob handled in dobhandler()

            case 'phone':
                formErrors.phone =
                    phoneNumberRegex.test(value)
                    ? ""
                    : "phone number should match uk mobile number";
                break;
            
            
            default:
            break;        
        }

        this.setState({formErrors, [name]: value }, () => console.log(this.state));

    };

    onSubmit = event => {
        event.preventDefault();
        if(formValid(this.state.formErrors)){
            //add to this function the connection to the DB. can retreive all the inputs values from 'this.state'. care: they are stored all as strings at the moment (JS dynamic types)
            const {fName, bio, city} = this.state;
            //^dunno if other elements can be added to the line above (db) so i've just left it for now^
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
        } else{
            console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
        }
        
    };


    render() {
        const { formErrors } = this.state;
        return(
            
            <div className="signup">
                SignUp page
                <div>
                    <p />
                </div>
                <form onSubmit={this.onSubmit}> 
                    <div>
                        <TextField error= {formErrors.fName} helperText= {formErrors.fName} name="fName" id="first-name-tb" onChange={this.onChange} value={this.fName} type="text" label="First Name"/>
                    </div>
                    <div>
                        <TextField error= {formErrors.lName} helperText= {formErrors.lName} name="lName" id="last-name-tb" onChange={this.onChange} value={this.lName} type="text" label="Last Name"/>
                    </div>
                    <div>
                        <TextField error= {formErrors.username} helperText= {formErrors.username} name="username" id="username-tb" onChange={this.onChange} value={this.username} type="text" label="Username" />
                    </div>
                    <div>
                        <TextField error= {formErrors.password} helperText= {formErrors.password} name="password" type={this.state.isPasswordVis ? "password" : "text"} id="password-tb" onChange={this.onChange} value={this.password} label="Password" 
                        InputProps={{
                            endAdornment:<InputAdornment position="end">
                                <IconButton onClick={this.setVisibilityPass}>{this.state.isPasswordVis ? <VisibilityOff /> : <Visibility />}</IconButton>
                            </InputAdornment>}}>
                        </TextField>
                    </div>
                    <div>
                        <TextField error= {formErrors.password_c} helperText= {formErrors.password_c} name="password_c" type={this.state.isPasswordCVis ? "password" : "text"} id="password_c-tb" onChange={this.onChange} value={this.password_c} label="Confirm Password"                         
                        InputProps={{
                            endAdornment:<InputAdornment position="end">
                                <IconButton onClick={this.setVisibilityPassC}>{this.state.isPasswordCVis ? <VisibilityOff /> : <Visibility />}</IconButton>
                            </InputAdornment>}}>
                        </TextField>
                    </div>
                    <div>
                        <TextField error= {formErrors.address_1} helperText= {formErrors.address_1} name="address_1" id="address_1-tb" onChange={this.onChange} value={this.address_1} type="text" label="Address Line 1" />
                    </div>
                    <div>
                        <TextField error= {formErrors.address_2} helperText= {formErrors.address_2} name="address_2" id="address_2-tb" onChange={this.onChange} value={this.address_2} type="text" label="Address Line 2" />
                    </div>
                    <div>
                        <TextField error= {formErrors.postcode} helperText= {formErrors.postcode} name="postcode" id="postcode-tb" onChange={this.onChange} value={this.postcode} type="text" label="Postcode" />
                    </div>
                    <div>
                        <TextField error= {formErrors.city} helperText= {formErrors.city} name="city" id="city-tb" onChange={this.onChange} value={this.city} type="text" label="City" />
                    </div>
                    <div>
                        <TextField error= {formErrors.country} helperText= {formErrors.country} name="country" id="country-tb" onChange={this.onChange} value={this.country} type="text" label="Country" />
                    </div>
                    <div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker error= {formErrors.dob} helperText= {formErrors.dob} name="dob" id="dobdate" margin="normal" clearable autoOk={true} disableOpenOnEnter variant="inline" label="Date of Birth" format="dd/MM/yyyy"
                            value={this.state.dob} onChange={this.handleDOB} />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div>
                        <TextField error= {formErrors.phone} helperText= {formErrors.phone} name="phone" id="phone-tb" onChange={this.onChange} value={this.phone} type="text" label="Phone Number" />
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

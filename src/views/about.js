import React, {Component} from 'react';
// import {fromServer} from '../components/GridProfile.js';
import $ from 'jquery';

import {useState} from 'react';
import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import 'date-fns';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {getCookie, getProfilePicURL, isUserLoggedIn, redirectIfNotLoggedIn} from '../helperFunctions';

import SaveIcon from '@material-ui/icons/Save';

import { makeStyles, rgbToHex } from '@material-ui/core/styles';

import board from "../res/chopping_board_chopped.png";

const emailRegex = RegExp(/^.+@[^\.].*\.[a-z]{2,}$/);

//will check to see if everythings valid before sending data to db
const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    
    return valid;
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
      profilePaper: {
        padding: theme.spacing(10),
        // textAlign: 'center',
        color: theme.palette.text.secondary,
        
      },
      recentMealsPaper:{
        padding: theme.spacing(6),
        width:'100%',
        // textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    
}));
class AboutTemplate extends Component {
    constructor(props){
        super(props);
    redirectIfNotLoggedIn();
    this.state = {
        username: null,
        password: null,
        password_c: null,

        formErrors:{
            username: "",
            password: "",
            password_c: "",

        }
        
    }

    }


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

            case 'password':
                formErrors.password = 
                    value.length >= 6 || (value.match(this.state.password_c) && (value.length == this.state.password_c.length))  
                    ? ""
                    : "minimum 6 characters required or passwords don't match";   
                break;
            case 'password_c':
                formErrors.password_c = 
                    (value.match(this.state.password) && (value.length == this.state.password.length))
                    ? ""
                    : "passwords must match"
                break;
            case 'username':
                formErrors.username = 
                    emailRegex.test(value)
                    ? ""
                    : "please use valid email address";
                break;
            default:
                break;
        }

        this.setState({formErrors, [name]: value }, () => console.log(this.state));
    };

    onSubmit = event => {
        event.preventDefault(); //stop page reload
        //If they are only changing email, or only changing password - just pass the thing they arent changing as an empty string, password must be >4 chars at leastr

        // //get user details from server
        // let fromServer;
        // $.ajax({ url: 'PHPF/getuserinfo.php',
        //     type: 'post',
        //     async: false,
        //     data: {"username" : getCookie("Username")},
        //     success: function(output){
        //         fromServer = JSON.parse(output);
        //     }
        // });

        if(formValid(this.state.formErrors) && (this.state.username!= null) && (this.state.password != null) && (this.state.password_c != null)){
            alert("details correct changing everything...");

            $.ajax({ url: 'PHPF/settings.php',
                type: 'post',
                async: false,
                data: {"email" : this.state.username, "password": this.state.password},
                success: function(){
                    alert("Updated details");
                },
                error: function(){
                    alert("server error changing all details");
                }
            });
        } else if((this.state.password != null) && this.state.username == null){
            if((this.state.password.match(this.state.password_c) && (this.state.password.length == this.state.password_c.length))){
                alert("details correct changing password");

                $.ajax({ url: 'PHPF/settings.php',
                    type: 'post',
                    async: false,
                    data: {"email" : this.state.username, "password": this.state.password},
                    success: function(){
                        alert("Updated details");
                    },
                    error: function(){
                        alert("server error changing password");
                    }
                });

            }
        } else if(this.state.username != null && this.state.password == null){
            alert("details correct changing email");

            $.ajax({ url: 'PHPF/settings.php',
                type: 'post',
                async: false,
                data: {"email" : this.state.username, "password": this.state.password},
                success: function(){
                    alert("Updated details");
                },
                error: function(){
                    alert("server error cahnging email")
                }
            });
        }  
    };

    render() {
        const classes = useStyles;
        const {formErrors} = this.state;

        
        // let {imagePreviewUrl} = this.state;
        // let $imagePreview = profilePicURL;

        console.log("render");

        return(
             <div className={classes.root} style={{height:'100%', width:'100%', position:'absolute'}}>
                <form onSubmit={this.onSubmit} style={{height:'100%', width:'100%'}}>
                    <Grid container style={{width:'100%', height:'100%'}}>
                        {/* first half of page */}
                        <Grid container style={{marginTop:'10%', marginBottom:'10%', marginRight:'20%', marginLeft:'20%'}}>
                            {/* profile paper */}
                                <Paper className={classes.profilePaper} style={{padding:'2.5%',width:'100%', "background-image" : `url(${board})`}}>
                                    <Grid item xs={3}>
                                        Settings
                                    </Grid>
                                    <Grid item xs={9} style={{marginTop:'2.5%', marginBottom:'8%', height:'88%', maxWidth:'100%'}}>
                                        <Grid item xs={12}>
                                            <TextField 
                                            name= "username"
                                            value= {this.username}
                                            onChange={this.onChange}
                                            error={formErrors.username}
                                            helperText={formErrors.username}
                                            style={{width:'80%', marginLeft:'10%', marginRight:'10%'}}
                                            variant="outlined"
                                            label= "Change Email address"
                                            />                                                                                                                                
                                        </Grid>

                                        <Grid item xs={12} style={{marginTop:'2.5%'}}>
                                            <TextField 
                                            name= "password"
                                            value= {this.password}
                                            onChange={this.onChange}
                                            error={formErrors.password}
                                            helperText={formErrors.password}
                                            type={this.state.isPasswordVis ? 
                                            "passowrd" : "text"}
                                            InputProps={{
                                                endAdornment:<InputAdornment position="end">
                                                    <IconButton onClick={this.setVisibilityPass}>{this.state.isPasswordVis ? <VisibilityOff /> : <Visibility />}</IconButton>
                                                </InputAdornment>}}
                                            style={{width:'80%', marginLeft:'10%', marginRight:'10%'}}
                                            variant="outlined"
                                            label= "Set New Password"
                                            />                                                                                                                                
                                        </Grid>

                                        <Grid item xs={12} style={{marginTop:'2.5%'}}>
                                            <TextField 
                                            name= "password_c"
                                            value= {this.password_c}
                                            onChange={this.onChange}
                                            error={formErrors.password_c}
                                            helperText={formErrors.password_c}
                                            type={this.state.isPasswordCVis ? "password" : "text"}
                                            InputProps={{
                                                endAdornment:<InputAdornment position="end">
                                                    <IconButton onClick={this.setVisibilityPassC}>{this.state.isPasswordCVis ? <VisibilityOff /> : <Visibility />}</IconButton>
                                                </InputAdornment>}}
                                            style={{width:'80%', marginLeft:'10%', marginRight:'10%'}}
                                            variant="outlined"
                                            label= "Confirm New Password"
                                            />                                                 
                                        </Grid>
                                    </Grid>                            
                                </Paper>
                        </Grid>
                    </Grid>
            
                    {/* footer */}
                    
                    <div class='fixed' style={{width:'100%', position:'fixed', bottom:0,
                    left: 0,
                    backgroundColor: 'rgb(76, 175, 80, 0.6)',
                    color: 'white',
                    textAlign: 'center'}}>
                        <Button
                            variant="contained"
                            size="medium"
                            color= 'primary'
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            type="submit"
                            style={{margin:'0.5%'}}
                            
                        >
                            Update
                        </Button>
                    </div>
                </form>
             </div>
        );
    }
}

export default AboutTemplate;

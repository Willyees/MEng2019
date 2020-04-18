import React, {Component} from 'react';
// import {fromServer} from '../components/GridProfile.js';
import $ from 'jquery';

import {useState} from 'react';
import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField';

import 'date-fns';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {getCookie, getProfilePicURL, isUserLoggedIn, redirectIfNotLoggedIn} from '../helperFunctions';

import SaveIcon from '@material-ui/icons/Save';

import { makeStyles, rgbToHex } from '@material-ui/core/styles';

import board from "../res/chopping_board_chopped.png";

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
//let fromServer;
//var copyInitial;
class SettingsTemplate extends Component {
    constructor(props){
        super(props);
	redirectIfNotLoggedIn();
        $.ajax({ url: 'PHPF/getuserinfo.php',
        type: 'post',
        async: false,
        data: {"username" : getCookie("Username")},
        // error: function() {
        //     //debug, harcoding for localhost and tests
        //     console.log("not on server");
        //     fromServer = JSON.parse('{"username":"harrypotter","name":"Harry","surname":"Potter","addressOne":"27 Union St","addressTwo":"","postcode":"G1 3RB","city":"Glasgow","country":"United Kingdom","dob":"Thu May 01 1991","mobile":"07826229468","dietary":"Only eat fresh haddock","bio":"I fucking love bears mate, dylans the man all bears love\\n\\nHere we see a bear worshipping dylan, a bear sad dylan isnt there, and dylans favourite bear - a good ol pola probably pacing the arctic in search of dylan himself","allergens":"Frozen Haddock"}');
        // },
        // success: function(output) {
        //     fromServer = JSON.parse(output);
        // }
    });
    }
    
    componentDidMount() {
	//Copy initial data to see what is changed
       // copyInitial = fromServer;
        console.log("component mount");
        // copyInitial = Object.assign({}, fromServer);
    }

    onChange = event => {//every time an element is modified from the user this function is called. So it is possible to perform checks for each keystroke if needed
        event.preventDefault();
        const { name, value} = event.target;
        
        this.setState(value);
        
        // if(typeof(event.target.value) !== undefined){
            // console.log(fromServer);
        // }
    };

    onSubmit = event => {
        event.preventDefault(); //stop page reload
        //If they are only changing email, or only changing password - just pass the thing they arent changing as an empty string, password must be >4 chars at leastr
        $.ajax({ url: 'PHPF/settings.php',
            type: 'post',
            async: false,
            data: {"username" : getCookie("Username"), "email": "NewEMailHereDylan", "password": "newpasswordheredylan"},
            success: function(output){
                alert("Record Updated");
            },
            error: function(){
                //Something on the backend failed, maybe add a meaningful message?
            }
        });
        	
        //checking errors
        // if(formValid(this.state.formErrors)){
        //     //Loop through fromServer array, see if anything has changed
        //     let toServer = {};
        //     let flag = 0;
        //     console.log("INITIAL");
        //     console.log(copyInitial);
        //     console.log(fromServer);
        //     console.log("--");
        //     $.each(fromServer, function(key, valueObj){
        //         console.log(key);
        //         console.log(valueObj);
        //         console.log(copyInitial[key]);
        //         if(valueObj != copyInitial[key]){ //DONT use !==
                    

        //         //Something has changed at it needs updating
        //         //IMPORTANT: This working relies on the ID's of the textfields in GridProfile
        //         //Been the same as the database ids kinda confusing
        //         toServer[key] = valueObj;
        //         flag = 1;
        //         }
        //     });
        //     //Lets pass this to the server, then clear the toServer array. 	
        //     //Should only call if toServer is not empty, but easy to check that with PHP
        //     console.log(toServer);
        //     if(flag == 1){
        //         $.ajax({ url: 'PHPF/updateuserinfo.php',
        //             type: 'post',
        //             async: false,
        //             data: {
        //                 "username" : copyInitial["username"], 
        //                 "update" : toServer
        //             },
        //             success: function(output) {
        //                     alert(output);
        //                 if(output == "DONE"){
        //                 alert("Records Updated");
        //                 }
        //                 else{
        //                 alert("failed");
        //                 }
        //             }
        //         });
        //     }
        // } else{
        //     console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
        //     alert("Form invalid, please check again");
        // }
    };

    render() {
        const classes = useStyles;
        
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
                                            style={{width:'80%', marginLeft:'10%', marginRight:'10%'}}
                                            variant="outlined"
                                            label= "Change Email address"
                                            />                                                                                                                                
                                        </Grid>

                                        <Grid item xs={12} style={{marginTop:'2.5%'}}>
                                            <TextField 
                                            style={{width:'80%', marginLeft:'10%', marginRight:'10%'}}
                                            variant="outlined"
                                            label= "Set New Password"
                                            />                                                                                                                                
                                        </Grid>

                                        <Grid item xs={12} style={{marginTop:'2.5%'}}>
                                            <TextField 
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

export default SettingsTemplate;

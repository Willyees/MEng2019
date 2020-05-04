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

import Typography from '@material-ui/core/Typography';

import 'date-fns';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import {getCookie, getProfilePicURL, isUserLoggedIn, redirectIfNotLoggedIn} from '../helperFunctions';

import SaveIcon from '@material-ui/icons/Save';

import { makeStyles, rgbToHex } from '@material-ui/core/styles';

import board from "../res/chopping_board_chopped.png";
import christmasDinner from "../res/christmasDinner.png";
import team from "../res/team3.png";
import dylanPic from "../res/dylan.png";
import alessioPic from "../res/alessio.png";
import oscarPic from "../res/oscar.png";



const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
    
}));
class AboutTemplate extends Component {
    constructor(props){
        super(props);
    redirectIfNotLoggedIn();
    }

    render() {
        const classes = useStyles
        return(
             <div className={classes.root}>
                <Grid container style={{width:"100%"}}>
                    <Grid item container xs={12} style={{marginTop:"10%", marginLeft:"5%", marginRight:"5%"}}>
                        <Paper style={{width:"inherit", height:"inherit"}}>
                            <Typography variant="h3">
                                About
                            </Typography>
                            <Grid item xs={12} >
                                <img src={christmasDinner}/>
                            </Grid>
                            <Typography >
                                hello
                            </Typography>
                            
                        </Paper>
                    </Grid>
                    <Grid item container xs={12} style={{marginTop:"5%", marginLeft:"5%", marginRight:"5%", marginBottom:"5%"}}>
                        <Paper style={{width:"inherit", height:"inherit"}}>
                            <Typography variant="h3">
                                Meet the team
                            </Typography>                            

                            <Grid container item xs={12}>

                                <Grid item xs={6}>
                                    <img src={team} style={{width:"97.5%", height:"95%", marginBottom:"5%"}}/>
                                </Grid>

                                <Grid item xs={6}>
                                    <Grid item xs={12} style={{height:"33.3%"}}>                                    
                                        <Avatar src={alessioPic} style={{marginLeft:"36.5%", width:"27.5%", height:"60%"}}/>
                                        <Typography variant="h5">
                                            Alessio Williams Gava
                                        </Typography>
                                        <Typography>
                                            Front end developer
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} style={{height:"33.3%"}}>
                                        <Avatar src={dylanPic}  style={{marginLeft:"36.5%", width:"27.5%", height:"60%"}}/>
                                        <Typography variant="h5">
                                            Dylan Tyrie-Dron
                                        </Typography>
                                        <Typography>
                                            Front end developer
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} style={{height:"33.3%"}}>
                                        <Avatar src={oscarPic} style={{marginLeft:"36.5%", width:"27.5%", height:"60%"}}/>
                                        <Typography variant="h5">
                                            Oscar Meanwell
                                        </Typography>
                                        <Typography>
                                            Back end developer
                                        </Typography>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    
                </Grid>
             </div>
        );
    }
}

export default AboutTemplate;

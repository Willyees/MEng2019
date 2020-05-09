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
import siteMap from "../res/siteMap.png";
import team from "../res/team.png";
import dylanPic from "../res/dylan.png";
import alessioPic from "../res/alessio.png";
import oscarPic from "../res/oscar.png";



const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
    
}));
class SiteMapTemplate extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const classes = useStyles
        return(
             <div className={classes.root}>
                <Grid container style={{width:"100%"}}>
                    <Grid item container xs={12} style={{marginTop:"10%", marginLeft:"5%", marginRight:"5%"}}>
                        <Paper style={{width:"inherit", height:"inherit"}}>
                            <Typography variant="h3">
                                Site Map
                            </Typography>
                            <Grid item xs={12} >
                                <img src={siteMap} style={{width:"97.5%", height:"95%", marginBottom:"5%"}}/>
                            </Grid>                            
                        </Paper>
                    </Grid>     
                </Grid>
             </div>
        );
    }
}

export default SiteMapTemplate;

import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {formatTime, defaultMealURL} from '../helperFunctions'

/**
 * creates a box used to show pic of meal along with the link to the show-meal page.
 * The box will have a fixed ratio size between width height of 1:0.75.
 * @param {*} props title, date, img, id
 */
export function MealBox(props){
    //import pic from `../res/${props.img}`;
    console.log(props)
    //var pic = require(`../res/${props.img}`); //todo add the image into the meal info
    //var pic = require('../res/bear1.png')
    
    var old = new Date(props.date) < new Date();
    return(
        <a className={"link-clean"} href={`/show-meal?meal=${props.id}`}>
        <Paper>
        <Paper elevation={0} style={{"background-image" : `url(${props.img}), url(${defaultMealURL})`, "background-size" : "cover", "height" : 0, "padding-bottom" : "75%", "filter" : (old ? "grayscale(1)" : "none")}}>
            <Grid container justify="flex-start">
                <Grid container item>
                    <Paper elevation={0}>
                        <Typography>{props.title}</Typography>
                    </Paper>
                </Grid>
            </Grid>
            
            
        </Paper>
        <Grid container justify="center">
                <Grid item>
                <Paper elevation={0}>
                    <Typography>{new Date(props.date).toDateString()}</Typography>
                </Paper>
                </Grid>
            </Grid>
        </Paper>
        </a>
    );
}
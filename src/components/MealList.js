import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

export default function MealList(props){
    //props: title, city, date, time
    return(
        <Grid container>
            <Grid item xs>
            <Typography>{props.title}</Typography>
            </Grid>
            <Grid item xs>
            <Typography>{props.city}</Typography>
            </Grid>
            <Grid item xs>
            <Typography>{props.date}</Typography>
            </Grid>
            <Grid item xs>
            <Typography>{props.time}</Typography>
            </Grid>
        </Grid>

    );
}

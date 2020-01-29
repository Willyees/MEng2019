import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridList from '../components/GridList.js';

import profile from "../res/profile.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function ShowMealGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Paper className={classes.paper}>
            <Grid container spacing ={0} >
                <Grid item container xs={12}>
                    title
                </Grid>

                <Grid item container xs={6}>
                    <Grid item xs={12}>
                        <img src={profile} />
                    </Grid>
                </Grid>

                <Grid item container xs={6}>
                    <Grid item xs={7}>
                        Date
                    </Grid>
                    
                    <Grid item xs={7}>
                        Time
                    </Grid>

                    <Grid item xs={7}>
                        City
                    </Grid>
                </Grid>

                <Grid item container xs={6}>
                    Proposed Meal
                </Grid>
                <Grid item container xs={6}>
                    Theme
                </Grid>

                <Grid item container xs={12}>
                    <TextField label="description" rows={5} rowsMax={5} fullWidth multiline variant="outlined" />
                </Grid>

                
            </Grid>
        </Paper>
    </div>
  );
}
import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridList from '../components/GridList.js';
import { blue } from '@material-ui/core/colors';

import mealPic from "../res/mealPic.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: theme.palette.primary,
    
  },
  paper: {
    padding: theme.spacing(10),
    color: theme.palette.secondary.main,
    marginLeft: "12%",
    marginRight: "12%",
    marginTop: "2%",
  },
}));

const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: {
        main: '#f44336',
      },
    },
  });

export default function ShowMealGrid() {
  const classes = useStyles();

  return (
    
    <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item container xs={12} style={{justifyContent:"left"}}>
                        <label>
                            title
                        </label>
                    </Grid>

                    <Grid item container xs={6} >
                        <Grid item xs={12} style={{justifyContent:"left", display: "flex"}} >
                            <img src={mealPic} height="200px" width="400px" style={{border: "1px solid #ddd", borderRadius: "15px"}}/>
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

                    <Grid item container xs={6}>
                        Guest Limit: ...
                    </Grid>

                    <Grid item container xs={6}>
                        Dietary Requirements
                    </Grid>

                    <Grid item container xs={6}>
                        Age Range
                    </Grid>

                    <Grid item container xs={6}>
                        Guest Expected contribution
                    </Grid>

                    
                </Grid>
            </Paper>
        </div>
    </ThemeProvider>
  );
}
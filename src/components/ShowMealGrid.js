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
                    <Grid id="title_grid" item container xs={12} style={{justifyContent:"left"}}>
                        <label id="title">
                            title
                        </label>
                    </Grid>

                    <Grid item container xs={6} >
                        <Grid item xs={12} style={{justifyContent:"left", display: "flex"}} >
                            <img src={mealPic} height="200px" width="400px" style={{border: "1px solid #ddd", borderRadius: "15px"}}/>
                        </Grid>
                    </Grid>

                    <Grid item container xs={6}>
                        <Grid id="date_grid" item xs={7}>
                        <label id="date">
                            Date
                        </label>
                        </Grid>
                        
                        <Grid id="time_grid" item xs={7}>
				<label id="time">
				    Time
				</label>
                        </Grid>

                        <Grid id="city_grid" item xs={7}>
				<label id="city">
				    City
				</label>
                        </Grid>
                    </Grid>

                    <Grid id="proposed_meal_grid" item container xs={6}>
				<label id="proposed_meal">
					Proposed Meal
				</label>
                    </Grid>
                    <Grid id="theme_grid" item container xs={6}>
				<label id="theme">
					Theme
				</label>
                    </Grid>

                    <Grid id="description_grid" item container xs={12}>
                        <TextField id="description" label="description" rows={5} rowsMax={5} fullWidth multiline variant="outlined" />
                    </Grid>

                    <Grid id="guest_limit_grid" item container xs={6}>
				<label id="guest_limit">
                        Guest Limit: ...
				</label>
                    </Grid>

                    <Grid id="dietary_grid" item container xs={6}>
				<label id="dietary">
                        Dietary Requirements
				</label>
                    </Grid>

                    <Grid id="age_range_grid" item container xs={6}>
				<label id="age_range">
                        Age Range
				</label>
                    </Grid>

                    <Grid id="contribution_grid" item container xs={6}>
				<label id="contribution">
	  			Expected Contribution
				</label>
                    </Grid>

                    
                </Grid>
            </Paper>
        </div>
    </ThemeProvider>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridList from './GridList.js';
import EditIcon from '@material-ui/icons/Edit';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import SaveIcon from '@material-ui/icons/Save';
import {getLatestMeals} from '../views/profile'
import board from '../res/chopping_board_chopped.png'
import ReviewList from './ReviewList'
import {getReviewsAjax} from './ShowMealGrid.js'
import $ from 'jquery';

//get the user profile pic
import profile from "../res/bear1.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
     
  },
  profilePaper: {
    padding: theme.spacing(6),
    marginLeft: "40%",
    marginTop: "10%",
    marginRight: "2%",
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    "background-image" : `url(${board})`,
    "background-size" : `contain`,
  },
  recentMealsPaper:{
    padding: theme.spacing(6),
    marginRight: "2%",
    marginTop: "10%",
    marginLeft: "8%",
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    width: "60%",
    "background-image" : `url(${board})`,
    "background-size" : `contain`,
  },
  reviews:{
    marginTop: "2%",
    "background-image" : `url(${board})`,
    "background-size" : `contain`,
  }
}));

const labels = {
    1: 'Meal Novice',
    2: 'Meal Apprentice',
    3: 'Meal Experienced',
    4: 'Meal Master',
    5: 'Meal Maestro',
  };
var dataPopulate;
export default function ProfileGrid() {
  const classes = useStyles();
  //this stuff only needed if we need to change the rating on this page
//   const [ value, setValue] = React.useState(2);
//   const [ hover, setHover] = React.useState(-1);
    const [recentMeals, setRecentMeals] = React.useState(getLatestMeals())
   var url = new URL(window.location.href);
   var param = url.searchParams.get("usr");
   $.ajax({ url: 'PHPF/viewprofile.php',
      type: 'post',
      async: false,
      data: {
	      //Get from URL
          "username" : param,
      },
	  success: function(output) {
	      dataPopulate = JSON.parse(output);
	  }
   });
   //debug
   if(window.location.host == "localhost:3000"){
       dataPopulate = {"username":"harrypotter","name":"Harry","surname":"Potter","city":"Glasgow","country":"United Kingdom","dob":29,"dietary":"Only eat fresh haddock","bio":"I fucking love bears mate, dylans the man all bears love\n\nHere we see a bear worshipping dylan, a bear sad dylan isnt there, and dylans favourite bear - a good ol pola probably pacing the arctic in search of dylan himself","allergens":"Frozen Haddock","rating":"3.6666666666667","rev_num":"3"}
   }


  

  return (
    <div className={classes.root}>
        <Grid container>
            {/* first half of page */}
            <Grid item container xs={6}>
                {/* profile paper */}
                
                    <Paper className={classes.profilePaper}>
                        <Typography variant= 'h5' style={{justifyContent:"left", display: "flex", color: "#888888 ", marginTop: "-4%"}}>
                            Personal Details
                        </Typography>

                        <Grid item container xs={12} style={{marginTop: "4%", justifyContent: "center"}}>
                            {/* get the users first name then last name */}
                            <Typography variant="h5" component="h5" gutterBottom style={{fontWeight:"bolder"}}>
	  			{dataPopulate["name"] + " " + dataPopulate["surname"]}
                            </Typography>
                        </Grid>

                        <Grid item container xs={12} >
                            <Grid item xs={12} style={{justifyContent:"left", display: "flex"}} >
                                <img src={profile} height="400px" width="100%" style={{border: "1px solid #ddd", borderRadius: "15px"}}/>
                            </Grid>

                            <Grid item xs={12}>
                                <Rating
                                    //delete this if we want users to be able to change the rating
                                    readOnly
                                    //this value should be set to the user's meal rating 
                                    value={dataPopulate["rating"]}
                                    precision={0.5}
                                />
                                {/* this changes the rating based on hover if we need that */}
                                {/* {value !== null &&  */}
                                <Box ml={1}>{labels[5]}
                                    {/* labels[hover !== -1 ? hover : value]} */}
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Paper >
                                    <Typography style={{justifyContent:"left", display: "flex", color: "#aeb1b5"}}>
                                        Email Address
                                    </Typography>

                                    {/* get the email */}
                                    <Typography variant="h6" component="h6" gutterBottom>
	  				{dataPopulate["username"]}
                                    </Typography>
                                </Paper>
                                
                            </Grid>
                        
                            <Grid item xs={12}>
                                <Paper >
                                    <Typography style={{justifyContent:"left", display: "flex", color: "#aeb1b5"}}>
                                        City
                                    </Typography>
                                    
                                    {/* get the city and country */}
                                    <Typography variant="h6" component="h6" gutterBottom>
	  				{dataPopulate["city"] + ", " + dataPopulate["country"]}
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={12}>
                                <Paper >
                                    <Typography style={{justifyContent:"left", display: "flex", color: "#aeb1b5"}}>
                                        Age
                                    </Typography>
                                    
                                    {/* get the age but maybe just age range? */}
                                    <Typography variant="h6" component="h6" gutterBottom>
	  				{dataPopulate["dob"]}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                        </Grid>
                    </Paper>
            </Grid>

            {/* second half of page */}
            <Grid item container xs={6}>
                {/* recent meals paper */}
                <Grid item container xs={12}>
                    <Paper className={classes.recentMealsPaper}>
                        <Typography variant= 'h5' style={{justifyContent:"left", display: "flex", color: "#888888  ", marginTop: "-4%"}}>
                            About
                        </Typography>

                        <Grid item container xs={12}>
                            <Typography style={{marginTop: "4%",justifyContent:"left", display: "flex", color: "#888888  "}}>
                                Recent Meals
                            </Typography>

                            <GridList recentMeals={recentMeals}/>
                        </Grid>
                        <Paper style={{marginTop: "3%",}}>
                            <Grid item xs={12}>
                                <Typography style={{justifyContent:"left", display: "flex", color: "#888888  "}}>
                                    Bio
                                </Typography>

                                {/* get the bio */}
                                <Typography variant="h6" component="h6" gutterBottom>
	  				{dataPopulate["bio"]}
                                </Typography>
                            </Grid> 
                        </Paper>
                    </Paper>
                </Grid>
                
                {/* preferences paper */}
                <Grid item container xs={12}>
                    <Paper className={classes.recentMealsPaper}>
                        <Typography variant= 'h5' style={{justifyContent:"left", display: "flex", color: "#888888  ", marginTop: "-4%"}}>
                            Preferences
                        </Typography>

                        <Paper style={{marginTop: "4%",}}>
                            <Grid item xs={12}>
                                <Typography style={{justifyContent:"left", display: "flex", color: "#aeb1b5"}}>
                                    Dietary Requirements
                                </Typography>

                                {/* get the dietry requirements */}
                                <Typography variant="h6" component="h6" gutterBottom>
	  				{dataPopulate["dietary"]}
                                </Typography>
                            </Grid> 
                        </Paper>

                        <Paper style={{marginTop: "3%",}}>
                            <Grid item xs={12}>
                                <Typography style={{justifyContent:"left", display: "flex", color: "#aeb1b5"}}>
                                    Allergens
                                </Typography>

                                {/* get the Allergens */}
                                <Typography variant="h6" component="h6" gutterBottom>
	  			 	{dataPopulate["allergens"]}
                                </Typography>
                            </Grid> 
                        </Paper>

                    </Paper>
                </Grid>
                
            </Grid>

            <Grid container xs ={12} justify="center">
                <Grid item xs={6}>
                <Paper className={classes.reviews}>
                
                    <ReviewList reviews={getReviewsAjax(param)} reviewDisabled={true} title={"Reviews"} mealId={""} />
                </Paper></Grid>
                </Grid>
            
        </Grid>
    </div>
  );
}

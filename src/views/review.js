import React, {Component} from 'react';
// import {fromServer} from '../components/GridProfile.js';
import $ from 'jquery';

import {useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';

import 'date-fns';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {getCookie, getProfilePicURL, isUserLoggedIn, redirectIfNotLoggedIn} from '../helperFunctions';

import SaveIcon from '@material-ui/icons/Save';
import { withStyles,makeStyles, rgbToHex } from '@material-ui/core/styles';

import board from "../res/repeatable_chop_board.png";

//will check to see if everythings valid before sending data to db
const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    
    return valid;
};

//used for the colour of selected and deselected rating
const StyledRating = withStyles({
    iconFilled: {
      color: '#40E0D0',
    },
    iconHover: {
      color: '#00CED1',
    },
  })(Rating);

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
class ReviewTemplate extends Component {
    
    constructor(props){
        super(props);
        redirectIfNotLoggedIn();
        this.state={
            title: null,
            rating : null,
            review: null,
            host: "garathThomas@gmail.com", //should be changed to an input taken from when the user clicks the add review button in the show-meal page
            formErrors: {
                title: "",
                rating: "",
                review: ""
            }
        }
    }

    onChange = event => {//every time an element is modified from the user this function is called. So it is possible to perform checks for each keystroke if needed
        event.preventDefault();
        const { name, value} = event.target;
        let formErrors = this.state.formErrors;

        switch(name){

            //not sure how to test the username to see if its already in db so I have left the username check for now, should go here like the others though.

            case 'title':
                formErrors.title = 
                    value.length == 0 
                    ? "please add a title"
                    : "";
                break;
            case 'rating':
                formErrors.rating = 
                value == null
                    ? "please rate the meal"
                    : "";
                break;
            case 'review':
                formErrors.review= 
                value.length == 0
                ? "please give a review"
                : "";

            default:
                break;
        }
        
        this.setState({formErrors, [name]: value }, () => console.log(this.state));
        
    };

    onSubmit = event => {
        const date = new Date(Date.now()).toLocaleString().split(',')[0];
        event.preventDefault(); //stop page reload
        if(formValid(this.state.formErrors) && this.state.rating != null){
            alert("user: "+ String(this.state.host) + "\n"
                + "reviewed: " + "getCookie" + "\n"
                + "title: " + String(this.state.title) + "\n"
                + "date: " + String(date) + "\n"
                + "star_rating: " + String(this.state.rating) + "\n"
                + "body: " + String(this.state.review) + "\n");
            $.ajax({ url: 'PHPF/addreview.php',
                type: 'post',
                data: {
                    "username": String(this.state.host),
                    "reviewed": String(getCookie("Username")), 
                    "title": String(this.state.title),
                    "date": String(date),
                    "star_rating": String(this.state.rating),
                    "body": String(this.state.review)
                },
                success: function(output){
                    alert(output);
                    if(output == "1"){
                        window.location.href = "/map"
                    }
                    else{
                        alert(output);
                    }
                }
        })
        }
        else{
            console.error("form invalid");
            let ratingMessage = "";
            if(formValid(this.state.formErrors)){

                ratingMessage = ", have you tried setting the rating?";
            }
            alert("form invalid, please chack again"+ratingMessage);
        }
    };

    render() {
        const classes = useStyles;
        const {formErrors} = this.state;

        console.log("render");

        return(
            
             <div className={classes.root} style={{height:'100%', width:'100%', position:'absolute'}}>
                <form onSubmit={this.onSubmit} style={{height:'100%', width:'100%'}}>
                    <Grid container style={{width:'100%', height:'100%'}}>
                        <Grid container style={{marginTop:'10%', marginRight:'20%', marginLeft:'20%'}}>                            
                            <Paper className={classes.profilePaper} style={{height:'80%',padding:'2.5%',width:'100%', "background-image" : `url(${board})`}}>
                                <Grid item xs={3}>
                                    Add Review
                                </Grid>
                                <Grid item xs={9} style={{marginTop:'2%', marginBottom:'8%', height:'88%', maxWidth:'100%'}}>                                
                                    <Grid item xs={3} style={{width:'20%', marginLeft:'7%'}}>
                                        <Typography style={{marginLeft:'-12.5%'}}component="legend">Meal Rating</Typography>                                                                                
                                        <StyledRating                                            
                                            name="rating" 
                                            precision={1}
                                            id="rating"
                                            error={formErrors.rating}
                                            helperText={formErrors.rating}
                                            value={this.rating}
                                            onChange={this.onChange}
                                            
                                        />                                                                                                               
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop:'2%'}}>
                                        <TextField 
                                        name="title"
                                        style={{width:'25%', marginRight:"55%"}}
                                        variant="outlined"            
                                        error={formErrors.title}
                                        align="left"
                                        helperText={formErrors.title}
                                        value={this.title}
                                        onChange={this.onChange}
                                        label= "Review Title"
                                        />                                                                                                                                
                                    </Grid>

                                    <Grid item xs={12} style={{marginTop:'2%'}}>
                                        <TextField 
                                        name="review"
                                        style={{width:'70%', marginRight:'10%'}}
                                        variant="outlined"
                                        multiline
                                        rows={8}
                                        rowsMax={8}
                                        error={formErrors.review}
                                        helperText={formErrors.review}
                                        value={this.review}
                                        onChange={this.onChange}
                                        label= "Add Review"
                                        />                                                                                                                                
                                    </Grid>

                                    <Grid item xs={12} style={{marginTop:'2%'}}>
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            color= 'primary'
                                            className={classes.button}                                            
                                            type="submit"
                                            style={{margin:'0.5%'}}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>

                                </Grid>                            
                            </Paper>
                        </Grid>
                    </Grid>
                </form>
             </div>
        );
    }
}

export default ReviewTemplate;

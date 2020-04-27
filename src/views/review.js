import React, {Component} from 'react';
// import {fromServer} from '../components/GridProfile.js';
import $ from 'jquery';

import {useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import ReviewParticipant from '../components/ReviewParticipant.js';
import Form from '../components/ReviewParticipant.js';

import 'date-fns';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {getCookie, getProfilePicURL, isUserLoggedIn, redirectIfNotLoggedIn} from '../helperFunctions';

import { withStyles,makeStyles, rgbToHex } from '@material-ui/core/styles';

import board from "../res/repeatable_chop_board.png";
import ReviewInputs from '../components/ReviewParticipant.js';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import CheckIcon from '@material-ui/icons/Check';


//will check to see if everythings valid before sending data to db
const formValid = formErrors => {
    let valid = false;
    
    Object.values(formErrors).forEach(val => {
        // console.log("val: "+ val.name);
        val.length == 0 && (valid = true);
    });
    
    console.log("error for title: "+ formErrors);
    console.log("valid: " + valid);
    return valid;
};

const getParticipants = mealId => {
    var data1 = [];
    $.ajax({url: 'PHPF/getparticipants.php',
            type : 'post',
            data : {"id" : mealId},
            async : false,
            success : function(out){
                var d1 = JSON.parse(out);
                d1.forEach(function(entry) {
                    var parsed = JSON.parse(entry);
                    data1.push(parsed)
                });
            },
            error : () => {console.log("Error in getting the participants")}
            })
    console.log(data1)
    return data1;    
}

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
    
}));

let people = ["sally", "gary", "greg", "tam"];
let people_full = []

class ReviewTemplate extends Component {
    
    constructor(props){
        super(props);
        redirectIfNotLoggedIn();
        //Get join meal requests from the window url param
        var url = new URL(window.location.href);
        var param = url.searchParams.get("meal");

        //get the participants from the db
        people_full = getParticipants(param);
        people = people_full.map((e) => {return e.n;})
        
        console.log(people)
        if(people.length == 0){
            alert("nothing in particpant list! Setting list to debug mode");
            console.log("nothing in list");
            people = ["sally", "gary", "greg", "tam"];
        }

        //console.log(people);

        //let people = ["sally", "gary", "greg", "tam"];
        
        this.state={         

            listState:{
                value: [""],
            },
            reviewState:{
                reviews: [{ participant: people[0], title: "", rating: "", body:"" }],
                formErrors: [{title: "please add a title", rating: "please add a rating", body: "please add a reveiw"}],
            },

            // setListState:{
            //     value: [""], 
            // },
           
        }
       
    
    }
    

    getNewState = (state, fieldType, idx, name, value) => {
        if (["participant","title", "rating", "body"].includes(fieldType)) {
          //console.log("id", e.target.dataset.id);
          //console.log("fieldType", e.target.dataset.fieldType);
          //console.log("dataset", e.target.dataset);
          const newReviews = [...state.reviews];
          newReviews[idx][fieldType] = value;
          return { ...state, reviews: newReviews };
        }
        return { ...state, [name]: value };
      };


    handleFormChange = e => {

        const { name, value} = e.target;
        let formErrors = this.state.reviewState.formErrors;
        console.log("name: "+ name);

            if(name.includes("title")){
                console.log("some more errors: "+formErrors);
                formErrors.title = 
                    value.length == 0 
                    ? "please add a title"
                    : "";
            }
            
            if(name.includes("body")){
                formErrors.body= 
                value.length == 0
                ? "please give a review"
                : "";
            }

        const newState = this.getNewState(
          this.state.reviewState,
          e.target.dataset.fieldType,
          e.target.dataset.id,
          e.target.name,
          e.target.value,
          {formErrors, [name]: value}
        );
        
        this.setState({formErrors, [name]: value }, () => console.log(this.state));
        this.setState(
            this.state.reviewState = newState,
        )
        // this.setReviewState(newState);
    };

    //every time an element is modified from the user this function is called. So it is possible to perform checks for each keystroke if needed
    

    handleRatingChange = (index, fieldType) => e => {
        const { name, value} = e.target;
        let formErrors = this.state.reviewState.formErrors;

        formErrors.rating = 
            value.length == 0 
            ? "please add a rating"
            : "";

        const newState = this.getNewState(
          this.state.reviewState,
          fieldType,
          index,
          e.target.name,
          e.target.value
        );
        this.setState(
            this.state.reviewState = newState,
        )
    };

    addReview = (participant, idx) => e => {
        //this.handleFormChange(this.state.reviewState.reviews);
        console.log("formErrors: "+ this.state.reviewState.formErrors);
        // console.log("index: "+idx);
        //maybe set if to check if person is already being reviewed and if so then scroll to that person
        // this.setReviewState({ ...this.reviewState, 
        // reviews: [...this.reviewState.reviews, { participant: participant, title: "", rating: "", body:"" }], 
        // });

        if(formValid(this.state.reviewState.formErrors)){
            this.setState(
                this.state.reviewState = ({
                    ...this.state.reviewState, 
                    reviews: [...this.state.reviewState.reviews, { participant: participant, title: "", rating: "", body:"" }], 
                })
            )
            
            let values = [...this.state.listState.value];
            let value = {...values[idx]};
            value = idx;
            values[idx] = value;
            console.log("values: "+ values  );
            this.setState(
                this.state.listState = ({value: values}),
            );
            //need to reinitialise the form errors after added each new review 
            this.state.reviewState.formErrors = [{title: "please add a title", rating: "please add a rating", body: "please add a reveiw"}];
        }
        else{
            alert("can't proceed, form not filled in");
        }

            
    };

    handleSubmit = e => {
        e.preventDefault();

        if(formValid(this.state.reviewState.formErrors)){
            // console.log("state", JSON.stringify("formvalid: "+this.state.reviewState.reviews[1].participant));
            //Loop through fromServer array, see if anything has changed
            //  let toServer = {};
            
            //Lets pass this to the server, then clear the toServer array. 	
            // Should only call if toServer is not empty, but easy to check that with PHP
            this.state.reviewState.reviews.forEach(element => {
                console.log("state", JSON.stringify("formvalid: "+ element.participant));
                const date = new Date(Date.now()).toLocaleString().split(',')[0];
                
                $.ajax({ url: 'PHPF/rateparticipant.php',
                    type: 'post',
                    async: false,
                    data: {
                        "username": getCookie("Username"),
                        "reviewed": this.state.reviewState.reviews.participant,
                        "title": this.state.reviewState.reviews.title,
                        "date": String(date),
                        "star_rating": this.state.reviewState.reviews.rating,
                        "body": this.state.reviewState.reviews.body
                    },
                    success: function(output) {
                            alert(output);
                        if(output == "DONE"){
                        alert("Records Updated");
                        }
                        else{
                        alert("failed");
                        }
                    }
                });
            });
            
        }
        else{
            alert("form invalid");
        }
    

        // event.preventDefault(); //stop page reload

        // //checking errors
        // if(formValid(this.state.formErrors)){
        //     
        // } else{
        //     console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
        //     alert("Form invalid, please check again");
        // }
    };

    render() {
        const classes = useStyles;
        // const {formErrors} = this.state;
        
        return (
            <form onChange={this.handleFormChange} onSubmit={this.handleSubmit}>
                <Grid container style={{width:'100%', height:'100%'}}>
                    <Grid item xs={6} style={{ marginTop:'5%'}}>                                     
                        <div style={{marginLeft:'22.5%', width:'52.5%', maxWidth:'50%', "background-image" : `url(${board})`,padding:'2.5%'}}>  
                            <label style={{color:"black"}}>
                                Participant List
                            </label>
                            <List value={this.state.listState.value}>
                                {people.map((listi, idx) => {              
                                    return(   
                                    <div key= {`listItem-${idx}`}>                           
                                        <ListItem button key={idx} onClick={this.addReview(people[idx], idx)} disabled={this.state.listState.value[idx] == idx? true: false}
                                        inputProps={{
                                            name: "customName"
                                        }}                   
                                        > 
                                        <ListItemAvatar>
                                            <Avatar>
                                            <FolderIcon/>{/*getCookie("Username") */}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            style={{color:"black"}}
                                            primary= {people[idx]}                                            
                                        />
                                        </ListItem>
                                    </div>
                                );
                                })}
                            </List>
                        </div>
                    </Grid>

                    {/* 2nd half of page- reviews */}
                    <Grid item xs={6} style={{marginTop:'5%',width:'50%'}}>
                    
                        {this.state.reviewState.reviews.map((review, idx) => {
                            // const participantId = `participant-${idx}`;
                            const titleId = `${people[0]}-title-${idx}`;
                            const ratingId = `${people[0]}-rating-${idx}`;
                            const bodyId = `${people[0]}-body-${idx}`;
                        return (
                            
                            <div key={`review-${idx}`}>                                                               
                                <Paper style={{marginBottom:'2%',padding:'2.5%', marginLeft:'25%', width:'50%', height:'50%', "background-image" : `url(${board})`}}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <label 
                                            // htmlFor={participantId}
                                            // name={participantId}                  
                                            // id={participantId}
                                            // inputProps={{ "data-id": idx, "data-field-type": "participant" }}
                                            >{this.state.reviewState.reviews[idx].participant} 
                                            </label>                              
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                type="text"
                                                name= {titleId}
                                                value={this.state.reviewState.reviews[idx].title}
                                                //  id={titleId}
                                                className="title"
                                                error={this.state.reviewState.formErrors.title}
                                                helperText={this.state.reviewState.formErrors.title}
                                                // data-idx={idx}
                                                inputProps={{ "data-id": idx, "data-field-type": "title" }}
                                                // error={formErrors.username}
                                                // helperText={formErrors.username}
                                                // style={{width:'80%', marginLeft:'10%', marginRight:'10%'}}
                                                variant="outlined"
                                                label= "Review title"                                                    
                                            />                                      
                                        </Grid>  
                
                                        <Grid item xs={6}>                                  
                                            <Typography style={{marginLeft:'-10%'}} component="legend">Participant Rating</Typography>                                                                                                                  
                                            <StyledRating                                            
                                                name={ratingId} 
                                                error={this.state.reviewState.formErrors.rating}
                                                helperText={this.state.reviewState.formErrors.rating}                                                                          
                                                precision={1}                                
                                                value={this.state.reviewState.reviews[idx].rating}
                                                onChange={this.handleRatingChange(idx, "rating")}
                                                // id={ratingId}
                                                data-idx={idx} 
                                                inputProps={{
                                                    name: "customName"
                                                }}                                                
                                                // inputProps={{ "data-idx": idx, "data-field-type": "rating" }}                                  
                                                // onChange={(event, newValue) => {
                                                //     // setValue(newValue);
                                                //     this.rating = newValue;
                                                // }}
                                            />
                                        </Grid>  
                
                                        <Grid item xs={12}>
                                            <TextField
                                            type="text"
                                            name={bodyId}     
                                            error={this.state.reviewState.formErrors.body}
                                                helperText={this.state.reviewState.formErrors.body}         
                                            // id={bodyId}
                                            inputProps={{ "data-id": idx, "data-field-type": "body" }}
                                            value={this.state.reviewState.reviews[idx].bodyId}
                                            variant="outlined"
                                            label= "Participant review" 
                                            fullWidth
                                            multiline
                                            rows={4}
                                            rowsMax={4}
                                            style={{marginTop:'2%'}}              
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </div>
                        );
                        })}               
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
                            startIcon={<CheckIcon />}
                            type="submit"
                            style={{margin:'0.5%'}}
                            
                        >
                            Submit
                        </Button>
                    </div>
                </Grid>
            </form>
            
            );
    }
}

export default ReviewTemplate;


//state variables
// title: null,
//             rating : null,
//             review: null,
            
//             host: "garathThomas@gmail.com", //should be changed to an input taken from when the user clicks the add review button in the show-meal page
//             formErrors: {
//                 title: "",
//                 rating: "",
//                 review: ""
//             },
//             questions: [
//                 { id: 'fdsd', title: 'Why is the sky blue?' },
//                 { id: 'adsf', title: 'Who invented pizza?' },
//                 { id: 'afdsf', title: 'Is green tea overrated?' },
//              ],
//             questionCounter:0,  
//state variables


// onChange = event => {//every time an element is modified from the user this function is called. So it is possible to perform checks for each keystroke if needed
    //     event.preventDefault();
    //     const { name, value} = event.target;
    //     let formErrors = this.state.formErrors;

    //     switch(name){

    //         //not sure how to test the username to see if its already in db so I have left the username check for now, should go here like the others though.

    //         case 'title':
    //             formErrors.title = 
    //                 value.length == 0 
    //                 ? "please add a title"
    //                 : "";
    //             break;
    //         case 'rating':
    //             formErrors.rating = 
    //             value == null
    //                 ? "please rate the meal"
    //                 : "";
    //             break;
    //         case 'review':
    //             formErrors.review= 
    //             value.length == 0
    //             ? "please give a review"
    //             : "";

    //         default:
    //             break;
    //     }
        
    //     this.setState({formErrors, [name]: value }, () => console.log(this.state));
        
    // };

    // onSubmit = event => {
    //     const date = new Date(Date.now()).toLocaleString().split(',')[0];
    //     event.preventDefault(); //stop page reload
    //     if(formValid(this.state.formErrors) && this.state.rating != null){
    //         alert("user: "+ String(this.state.host) + "\n"
    //             + "reviewed: " + "getCookie" + "\n"
    //             + "title: " + String(this.state.title) + "\n"
    //             + "date: " + String(date) + "\n"
    //             + "star_rating: " + String(this.state.rating) + "\n"
    //             + "body: " + String(this.state.review) + "\n");
    //         $.ajax({ url: 'PHPF/addreview.php',
    //             type: 'post',
    //             data: {
    //                 "username": String(this.state.host),
    //                 "reviewed": String(getCookie("Username")), 
    //                 "title": String(this.state.title),
    //                 "date": String(date),
    //                 "star_rating": String(this.state.rating),
    //                 "body": String(this.state.review)
    //             },
    //             success: function(output){
    //                 alert(output);
    //                 if(output == "1"){
    //                     window.location.href = "/map"
    //                 }
    //                 else{
    //                     alert(output);
    //                 }
    //             }
    //     })
    //     }
    //     else{
    //         console.error("form invalid");
    //         let ratingMessage = "";
    //         if(formValid(this.state.formErrors)){

    //             ratingMessage = ", have you tried setting the rating?";
    //         }
    //         alert("form invalid, please chack again"+ratingMessage);
    //     }
    // };

    // displayQuestion = () => {
    //     this.setState({
    //         displayQuestions: !this.state.displayQuestions
    //     })
    // }
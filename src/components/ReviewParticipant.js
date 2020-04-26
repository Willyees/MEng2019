import React, {Component, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {isUserLoggedIn, getCookie} from '../helperFunctions';
import Link from '@material-ui/core/Link'
import AddIcon from '@material-ui/icons/Add';
import Rating from '@material-ui/lab/Rating';
import SettingsIcon from '@material-ui/icons/Settings';
import ExploreIcon from '@material-ui/icons/Explore';
import LogOutIcon from '@material-ui/icons/ExitToApp';
import CheckIcon from '@material-ui/icons/Check';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import SaveIcon from '@material-ui/icons/Save';
import $ from 'jquery';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import board from "../res/repeatable_chop_board.png";

//will check to see if everythings valid before sending data to db
const formValid = formErrors => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
  });
  
  return valid;
};

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
        flexgrow: 1,
        width: '100%', 
    },
    profilePaper: {
        padding: theme.spacing(10),
        // textAlign: 'center',
        color: theme.palette.text.secondary,
        
      },
      demo: {
        "background-image" : `url(${board})`
      },
    
  }));

const getNewState = (state, fieldType, idx, name, value) => {
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

function Form() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const people = ["sally", "gary", "greg", "tam"];

  const [state, setState] = React.useState({
    value: [""], 
  });
  const [reviewState, setReviewState] = React.useState({    
    reviews: [{ participant: people[0], title: "", rating: "", body:"" }],
  });

  const handleFormChange = e => {
    const newState = getNewState(
      reviewState,
      e.target.dataset.fieldType,
      e.target.dataset.id,
      e.target.name,
      e.target.value
    );
    setReviewState(newState);
  };

  const handleRatingChange = (index, fieldType) => e => {
    const newState = getNewState(
      reviewState,
      fieldType,
      index,
      e.target.name,
      e.target.value
    );
    setReviewState(newState);
  };

  const addReview = (participant, idx) => e => {
    console.log("index: "+idx);
    //maybe set if to check if person is already being reviewed and if so then scroll to that person
    setReviewState({ ...reviewState, 
    reviews: [...reviewState.reviews, { participant: participant, title: "", rating: "", body:"" }], 
    });
    
    let values = [...state.value];
    let value = {...values[idx]};
    value = idx;
    values[idx] = value;
    console.log("values: "+ values  );
    setState({value: values});
    console.log("state.value: "+ state.value);    
  };

  const handleSubmit = e => {
    console.log("state", JSON.stringify(reviewState));
    e.preventDefault();
  };
  
  return (
    <form onChange={handleFormChange} onSubmit={handleSubmit}>
      <Grid container style={{width:'100%', height:'100%'}}>
        <Grid item xs={6} style={{ marginTop:'5%'}}>     
                      
          <div className={classes.demo} style={{marginLeft:'25%', width:'50%', maxWidth:'50%'}}>  
            <label style={{color:"black"}}>
              Participant List
            </label>                                                          
              <List dense={dense} value={state.value}>
                {people.map((listi, idx) => {              
                  return(   
                    <div key= {`listItem-${idx}`}>                           
                      <ListItem button key={idx} onClick={addReview(people[idx], idx)} disabled={state.value[idx] == idx? true: false}
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
                          secondary={secondary ? 'Secondary text' : null}
                        />
                      </ListItem>
                    </div>
                  );
                })}
              </List>
            </div>
        </Grid>

        <Grid item xs={6} style={{marginTop:'5%',width:'50%'}}>
          
            {reviewState.reviews.map((review, idx) => {
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
                      >{reviewState.reviews[idx].participant} 
                      </label>                              
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        type="text"
                        // name= {titleId}
                        value={reviewState.reviews[idx].title}
                        // id={titleId}
                        className="title"
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
                      <Typography style={{marginLeft:'-10%'}}component="legend">Participant Rating</Typography>                                                                                                                  
                      <StyledRating                                            
                        // name={ratingId}                                                                           
                        precision={1}                                
                        value={reviewState.reviews[idx].rating}
                        onChange={handleRatingChange(idx, "rating")}
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
                        // name={bodyId}              
                        // id={bodyId}
                        inputProps={{ "data-id": idx, "data-field-type": "body" }}
                        value={reviewState.reviews[idx].bodyId}
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

export default Form;
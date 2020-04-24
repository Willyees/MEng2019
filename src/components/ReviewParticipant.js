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
        backgroundColor: theme.palette.background.paper,
      },
    
  }));

  // const getNewState = (state, fieldType, index, name, value) => {
  //   if (["name", "age"].includes(fieldType)) {
  //     const newCats = [...state.cats];
  //     newCats[index][fieldType] = value;
  //     return { ...state, cats: newCats };
  //   }
  //   return { ...state, [name]: value };
  // };
  

//   const ReviewInputs = ({ idx, reviewState, handleRatingChange }) => {
//     const participantId = `participant-${idx}`;
//     const titleId = `title-${idx}`;
//     const ratingId = `rating-${idx}`;
//     const bodyId = `body-${idx}`;
//     return (
//         <div key={`review-${idx}`}>
//           <Paper style={{marginLeft:'25%',marginBottom:'2%',padding:'2.5%',width:'50%', height:'50%', "background-image" : `url(${board})`}}>
//             <Grid container>
//               <Grid item xs={12}>
//                 <label 
//                   htmlFor={participantId}
//                   name={participantId}
//                   data-idx={idx}
//                   className="participant"
//                   id={participantId}
//                 >{state.reviews[idx].participant} 
//                 </label>                              
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   type="text"
//                   name= {titleId}
//                   value={reviewState[idx].title}
//                   id={titleId}
//                   className="title"
//                   data-idx={idx}
//                   inputProps={{ "data-idx": idx, "data-field-type": "title" }}
//                   // error={formErrors.username}
//                   // helperText={formErrors.username}
//                   // style={{width:'80%', marginLeft:'10%', marginRight:'10%'}}
//                   variant="outlined"
//                   label= "Review title"                                                     
//                 />                                      
//               </Grid>  

//               <Grid item xs={6}>                                  
//                 <Typography style={{marginLeft:'-10%'}}component="legend">Participant Rating</Typography>                                                                                                                  
//                 <StyledRating                                            
//                   name={ratingId}                                                                           
//                   precision={1}                                
//                   value={reviewState[idx].rating}
//                   onChange={handleRatingChange(idx, "rating")}
//                   id={ratingId}
//                   data-idx={idx} 
//                   inputProps={{
//                     name: "customName"
//                   }}                                                
//                   // inputProps={{ "data-idx": idx, "data-field-type": "rating" }}                                  
//                   // onChange={(event, newValue) => {
//                   //     // setValue(newValue);
//                   //     this.rating = newValue;
//                   // }}
//                 />
//               </Grid>  

//               <Grid item xs={12}>
//                 <TextField
//                   type="text"
//                   name={bodyId}              
//                   id={bodyId}
//                   inputProps={{ "data-idx": idx, "data-field-type": "body" }}
//                   value={reviewState[idx].bodyId}
//                   variant="outlined"
//                   label= "Participant review" 
//                   fullWidth
//                   multiline
//                   rows={4}
//                   rowsMax={4}
//                   style={{marginTop:'2%'}}              
//                 />
//               </Grid>
//             </Grid>
//           </Paper>
//         </div>
//     );
// };

// ReviewInputs.propTypes = {
//     idx: PropTypes.number,
//     catState: PropTypes.array,
//     handleReviewChange: PropTypes.func,
// };


// const Form = () => {
//   const [state, setState] = React.useState({
//     reviews: [{ participant: 'gary',title: '', rating: '', body: '' }],
//   });
//   const handleFormChange = e => {
//     const newState = getNewState(
//       state,
//       e.target.dataset.fieldType,
//       e.target.dataset.id,
//       e.target.name,
//       e.target.value
//     );
//     setState(newState);
//   };

//   const handleRatingChange = (index, fieldType) => e => {
//     const newState = getNewState(
//       state,
//       fieldType,
//       index,
//       e.target.name,
//       e.target.value
//     );
//     setState(newState);
//   };

//   const addReview = e => {
//     setState({ ...state, reviews: [...state.reviews, { participant: "gary",title: "", rating: "", body: ""}] });
//   };

//   const handleSubmit = e => {
//     console.log("state", JSON.stringify(state));
//     e.preventDefault();
//   };


    
//     // const blankReview = { participant: participant,title: '', rating: '', body: ''};
//     // const [reviewState, setReviewState] = useState([
//     //     { ...blankReview },
//     // ]);

//     // const addReview = () => {
//     //     setReviewState([...reviewState, { ...blankReview }]);
//     // };

//     // const handleReviewChange = (e) => {
//     //     const updatedReviews = [...reviewState];
//     //     updatedReviews[e.target.dataset.idx][e.target.dataset.fieldType] = e.target.value;
//     //     setReviewState(updatedReviews);
//     // };

//     // const handleRatingChange = (index, fieldType) => e => {
//     //   const updatedReviews = [...reviewState];
//     //   updatedReviews[index][fieldType][] = e.target.value;
//     //   setReviewState(updatedReviews);
//     //   // getNewState(
//     //   //   state,
//     //   //   fieldType,
//     //   //   index,
//     //   //   e.target.name,
//     //   //   e.target.value
//     //   // );
//     //   // setState(newState);
//     // };

//     return (
//         <form style={{marginTop:'10%'}} onChange={handleFormChange}>
//             <input
//                 type="button"
//                 value="Add New Review"
//                 onClick={addReview}
//             />
//             {
//                 state.reviews.map((val, idx) => (
//                     <ReviewInputs
//                         key={`review-${idx}`}
//                         idx={idx}
//                         reviewState={state}
//                         handleRatingChange={handleRatingChange}
//                     />
//                 ))
//             }
//             <input type="submit" value="Submit" />
//         </form>
//     );
// };

// export default Form;









function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
function ListItemLink(props, ) {
  return <ListItem button component="a" {...props} />;
}

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

const getNewListState = (state, fieldType, idx, name, value) =>{
  if(["sally", "gary", "greg"].includes(fieldType)){
    const newList = [...state.peoplelist];
    newList[idx][fieldType] = value;
    return {...state, peoplelist: newList};
  }
  return {...state, [name]:value};
};

function Form() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [state, setState] = React.useState({
    value: ["", "", ""],
  });
  const people = ["sally", "gary", "greg"];
  const [reviewState, setReviewState] = React.useState({    
    reviews: [{ participant: people[0], title: "", rating: "", body:"" }],
  });

  // const [listState, setListState] = React.useState({
  //   liDisabled: this.props.component.disabled,
  // });
  

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

  // const handleListChange = (index, fieldType) => e=>{
  //   setListState({
  //     liDisabled: !this.props.component.disabled,
  //   });
  // }

  const addReview = (participant, idx) => e => {
    console.log("index: "+idx);
    //maybe set if to check if person is already being reviewed and if so then scroll to that person
    setReviewState({ ...reviewState, 
    reviews: [...reviewState.reviews, { participant: participant, title: "", rating: "", body:"" }], 
    });
    
    // 1. Make a shallow copy of the items
    let values = [...state.value];
    
    // 2. Make a shallow copy of the item you want to mutate
    let value = {...values[idx]};
    // 3. Replace the property you're intested in
    value = idx;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    values[idx] = value;
    // 5. Set the state to our new copy
    console.log("values: "+ values  );
    setState({value: values});
    console.log("state.value: "+ state.value);
    // setOpen(!open);
    
    
    // handleListChange(idx, "list")
  };

  const handleSubmit = e => {
    console.log("state", JSON.stringify(reviewState));
    e.preventDefault();
  };
  // const participantId = `participant-${idx}`;
  //   const titleId = `title-${idx}`;
  //   const ratingId = `rating-${idx}`;
  //   const bodyId = `body-${idx}`;
  
  return (
    
    <Grid container style={{width:'100%', height:'100%'}}>
      <Grid item xs={6} style={{ marginTop:'5%'}}>          
        <div className={classes.demo} style={{marginLeft:'25%', width:'50%', maxWidth:'50%'}}>
          <List dense={dense} value={state.value}>
            {people.map((listi, idx) => {              
              // addReview(people[idx], idx)
              // addReview(people[idx],listi)
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
        <form onChange={handleFormChange} onSubmit={handleSubmit}>
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
          {/* <button onClick={addReview}>Add new Review</button> */}
        </form>
      </Grid> 
    </Grid>
  );
}

export default Form;






// const Form = () => {
//     // const [ownerState, setOwnerState] = useState({
//     //     owner: '',
//     //     description: '',
//     // });

//     // const handleOwnerChange = (e) => setOwnerState({
//     //     ...ownerState,
//     //     [e.target.name]: [e.target.value],
//     // });

//     const blankReview = {participant: '', title: '', rating:'', body: ''};
//     const [reviewState, setReviewState] = useState([
//         { ...blankReview },
//     ]);

//     const addReview = () => {
//         setReviewState([...reviewState, { ...blankReview }]);
//     };

//     const removeReview = () =>{
//         setReviewState(reviewState.splice(0, reviewState.length-1));
//     };

//     const handleReviewChange = (e) => {
//         const updatedReviews = [...reviewState];
//         console.log("target value: "+ e.target.value + " dataset index: " + e.target.dataset.idx + " classname: " + e.target.className);
//         updatedReviews[e.target.dataset.idx][e.target.className] = e.target.value;
//         setReviewState(updatedReviews);
        
//     };

//     return (
//         <form>
//             <div style={{marginTop:'4%'}}>
//                 {/* <label htmlFor="owner">Owner</label>
//                 <input
//                     type="text"
//                     name="owner"
//                     id="owner"
//                     value={ownerState.owner}
//                     onChange={handleOwnerChange}
//                 />
//                 <label htmlFor="description">Description</label>
//                 <input
//                     type="text"
//                     name="description"
//                     id="description"
//                     value={ownerState.description}
//                     onChange={handleOwnerChange}
//                 /> */}
//                 <input
//                     type="button"
//                     value="Hello Bear"
//                     onClick={addReview}
//                 />
//                 <input
//                     type="button"
//                     value="bye bear"
//                     onClick={removeReview}
//                 />            
//             </div>
//             {
//                 reviewState.map((val, idx) => {
//                     //const participantId = `participant-${idx}`; 
//                     const titleId = `title-${idx}`;
//                     const ratingId = `rating-${idx}`;
//                     const bodyId = `body-${idx}`;                
//                     return (
//                         <div key={`review-${idx}`}>
//                           <Paper style={{marginLeft:'25%',marginBottom:'2%',padding:'2.5%',width:'50%', height:'50%', "background-image" : `url(${board})`}}>
//                               <Grid container>
//                                 {/* <Grid item xs={12}>
//                                   <label htmlFor={participantId}>{reviewState[idx].participant} </label>                              
//                                 </Grid> */}
//                                 <label htmlFor={}></label>
//                                 <Grid item xs={6}>
//                                   <TextField
//                                     name= {titleId}
//                                     value={reviewState[idx].title}
//                                     id={titleId}
//                                     className="title"
//                                     data-idx={idx}
//                                     onChange={handleReviewChange}
//                                     // error={formErrors.username}
//                                     // helperText={formErrors.username}
//                                     // style={{width:'80%', marginLeft:'10%', marginRight:'10%'}}
//                                     variant="outlined"
//                                     label= "Review title" 
                                                                                               
//                                   />                                      
//                                 </Grid>  

//                                 <Grid item xs={6}>                                  
//                                   <Typography style={{marginLeft:'-10%'}}component="legend">Participant Rating</Typography>                                                                                                                  
//                                   <StyledRating                                            
//                                     name={ratingId}                                                                           
//                                     precision={1}                                
//                                     value={reviewState[idx].rating}
//                                     id={ratingId}
//                                     className="rating"
//                                     data-idx={idx}
//                                     onChange={handleReviewChange}
                                    
//                                     // onChange={(event, newValue) => {
//                                     //     // setValue(newValue);
//                                     //     this.rating = newValue;
//                                     // }}
//                                   />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                 <TextField
//                                     name= {bodyId}
//                                     value={reviewState[idx].body}
//                                     data-idx={idx}
//                                     onChange={handleReviewChange}                                          
//                                     id={bodyId}
//                                     className="body"                                    
//                                     // error={formErrors.username}
//                                     // helperText={formErrors.username}
//                                     // style={{width:'80%', marginLeft:'10%', marginRight:'10%'}}
//                                     variant="outlined"
//                                     label= "Participant review" 
//                                     fullWidth
//                                     multiline
//                                     rows={4}
//                                     rowsMax={4}
//                                     style={{marginTop:'2%'}}                           
//                                   /> 
//                                 </Grid>

//                             </Grid>               
//                             {/* <img 
//                                   src={bear}
//                                   height='25%'
//                                   width='25%'
//                               /> */}

//                           </Paper>
//                             {/* <label htmlFor={catId}>{`Bear #${idx + 1}`}</label> */}
//                             {/* <input
//                                 type="text"
//                                 name={catId}
//                                 data-idx={idx}
//                                 id={catId}
//                                 className="name"
//                                 value={catState[idx].name}
//                                 onChange={handleCatChange}
//                             />
//                             <label htmlFor={ageId}>Age</label>
//                             <input
//                                 type="text"
//                                 name={ageId}
//                                 data-idx={idx}
//                                 id={ageId}
//                                 className="age"
//                                 value={catState[idx].age}
//                                 onChange={handleCatChange}
//                             /> */}
                            
//                         </div>
//                     );
//                 })
//             }
//             <input type="submit" value="Submit" />
//         </form>
//     );
// };

// Form.propTypes = {
//   idx: PropTypes.number,
//   reviewState: PropTypes.array,
//   rating: PropTypes.number,
//   handleReviewChange: PropTypes.func,
// };


//     const ReviewParticipant= () =>{

//         const classes = useStyles();  

//         const [ownerState, setOwnerState] = useState({
//             owner: '',
//             description: '',
//           });
//         const handleOwnerChange = (e) => setOwnerState({
//         ...ownerState,
//         [e.target.name]: [e.target.value],
//         });

//         const handleBearChange = (e) => {
//             const updatedBears = [...bearState];
//             updatedBears[e.target.dataset.index][e.target.className] =
//             e.target.value;
//             setBearState(updatedBears);
//         };
        
//         const blankBear = {name: '', age: ''}; 
//         const [bearState, setBearState] = useState([
//             {...blankBear}
//         ]);

//         const addBear = () => {
//             setBearState([...bearState, {...blankBear}]);
//         }

//         return(                           
//             <div className={classes.root} style={{marginTop:'10%', height:'100%', width:'100%', position:'absolute'}}>
//                 {/* <form onSubmit={this.onSubmit} style={{height:'100%', width:'100%'}}> */}
//                 <form>
//                     {/* <Paper className={classes.profilePaper} style={{marginBottom:'10%',marginTop:'10%',padding:'2.5%',width:'100%', "background-image" : `url(${board})`}}>
//                         <Grid container >
//                             <Grid item xs={12}> */}
//                                 <label htmlFor="owner">Owner</label>   
//                                 <input 
//                                     type="text" 
//                                     name="owner" 
//                                     id="owner" 
//                                     value={ownerState.owner}
//                                     onChange={handleOwnerChange}
//                                 /> 
//                                 <label htmlFor="description">Description</label> 
//                                 <input 
//                                     type="text" 
//                                     name="description" 
//                                     id="description" 
//                                     value={ownerState.owner}
//                                     onChange={handleOwnerChange}     
//                                 />
//                             {/* </Grid> */}


//                             {/* <Grid item xs={12}> */}
//                                 <button 
//                                     onClick={addBear}
//                                     style={{width:'10%', height:'100%'}}
//                                 >say hello</button>
//                             {/* </Grid>
//                             <Grid item xs={12}> */}
//                                 {
//                                     bearState.map((val, index) => {
//                                         const bearID = `name-${index}`;
//                                         const ageID = `age-${index}`;
//                                         return (
//                                             <div key={`bear-${index}`}>
//                                                 <label htmlFor={bearID}>{`bear #${index+1}`}</label>
//                                                 <input
//                                                     type="text"
//                                                     name={bearID}
//                                                     data-idx={index}
//                                                     id={bearID}
//                                                     className="name" 
//                                                     value={bearState[index].name}
//                                                     onChange={handleBearChange}
//                                                 />
//                                                 <label htmlFor={ageID}>Age</label>
//                                                 <input
//                                                     type="text"
//                                                     name={ageID}
//                                                     data-idx={index}
//                                                     id={ageID}
//                                                     className="age"
//                                                     value={bearState[index].age}
//                                                     onChange={handleBearChange}
//                                                 />

//                                             </div>
//                                         )
//                                     })
//                                 }
//                             {/* </Grid>
//                         </Grid> */}
//                         {/* footer */}
//                         <div class='fixed' style={{width:'100%', position:'fixed', bottom:0,
//                         left: 0,
//                         backgroundColor: 'rgb(76, 175, 80, 0.6)',
//                         color: 'white',
//                         textAlign: 'center'}}>
//                             <Button
//                                 variant="contained"
//                                 size="medium"
//                                 color= 'primary'
//                                 className={classes.button}
//                                 startIcon={<SaveIcon />}
//                                 type="submit"
//                                 style={{margin:'0.5%'}}
                                
//                             >
//                                 Save Reviews
//                             </Button>  
//                         </div>
//                     {/* </Paper> */}
                    
                    
//                 </form>
//             </div> 
//         );
//   }

//   export default ReviewParticipant;

  function getNotifications(){
    if(!isUserLoggedIn)
      return [];
    var notifications = [];
    var username = getCookie("Username");
    $.ajax({ url: 'PHPF/checkrequestnumber.php',
		    type: 'post',
        data: {"host" : username},
        async:false,
		    success: function(out){
          console.log(out, "success");
          let d1 = JSON.parse(out)
          d1.forEach((entity)=> {
            notifications.push(JSON.parse(entity));
          })
          console.log("notifications: ", notifications);
        }
        
    })

    return notifications;
  }

  function Logged() {
    return (
      <div>
        <Button color="inherit" href="/log-in">Login</Button>
        <Button color="inherit" href="/sign-up">Sign-up</Button>
      </div>
    );
  }

  function NotificationBanner(props){
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    console.log("requests", props.requests.length)
    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = event => {
      setAnchorEl(null);
    };

    return(
      <div>
        <IconButton onClick={handleMenu} color="inherit">
          {props.requests.length > 0 ? <NotificationsActiveIcon/> : <NotificationsIcon/>}
        </IconButton>
        <Menu id="notification-banner" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
          <Typography>{props.requests.length} Requests to join your meals:</Typography>
          {props.requests.map((elem)=> (
            <MenuItem component={Link} href={`/show-meal?meal=${elem.meal_id}`} onClick={handleClose}>{elem.num} requests</MenuItem>
          ))}
          

          <Divider/>
          <Typography>Your recent accepted requests:</Typography>
        </Menu>
      </div>
    )
  }

  function MenuBanner() {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const redirection = new Map([["/profile","profile-menu"],["/meals", "meals-menu"],["/settings", "settings-menu"]]); //map of URL: menu value, used to redirect
  
    const handleChange = event => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = event => {
      setAnchorEl(null);
      console.log(event.currentTarget.val);
    };

    const handleLogOut = () => {
      setAnchorEl(null);
      console.log("Log out")
      var decC = decodeURIComponent(document.cookie);
      var tmp = decC.split(';');
      for(var i = 0; i <tmp.length; i++) {
        //find all the cookie names and then change the expiration date
        document.cookie = tmp[i] + "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
      }

    }
    return (
      <div>
        <IconButton edge="end" className={classes.menuButton} onClick={handleMenu} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Menu id="menu-banner" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}
        // anchorOrigin={{
        //   vertical: 'top',
        //   horizontal: 'right',
        // }}
        
        // transformOrigin={{
        //   vertical: 'top',
        //   horizontal: 'right',
        // }}
      >
        {/*todo: change href to correct ones using the map*/}
        <MenuItem val="profile-menu" component={Link} href="/profile" color="inherit" onClick={handleClose}>Profile</MenuItem>
        <MenuItem val="meals-menu" component={Link} href="/meals-user" color="inherit" onClick={handleClose}>My Meals</MenuItem>
        <MenuItem val="show-meals-menu" component={Link} href="/map" color="inherit" onClick={handleClose}>
          <ExploreIcon/>Show me meals
        </MenuItem>
        <MenuItem val="create-meal-menu" component={Link} href="/create-meal" color="inherit" onClick={handleClose}>
          <AddIcon/>Create Meal
        </MenuItem>
        <MenuItem val="settings-menu" component={Link} href="/settings" color="inherit" onClick={handleClose}>
          <SettingsIcon/>Settings
          </MenuItem>
          <MenuItem val="log-out-menu" component={Link} href="/" color="inherit" onClick={handleLogOut}>
            <LogOutIcon /> Log Out
          </MenuItem>
      </Menu>  
    </div>
    )
  }
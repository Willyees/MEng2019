import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {getCookie} from '../helperFunctions';
import GridList from '../components/GridList.js';
import EditIcon from '@material-ui/icons/Edit';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import SaveIcon from '@material-ui/icons/Save';
import $ from 'jquery';
import profile from "../res/profile.png";

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
  },
  recentMealsPaper:{
    padding: theme.spacing(6),
    marginRight: "2%",
    marginTop: "10%",
    marginLeft: "8%",
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    width: "60%",
  },
}));

const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  };

function getLatestMeals(){
    var data = []
    console.log("getmleas")
    $.ajax({ url: 'PHPF/getmealsuser.php',
    type: 'post',
    async: false,
    data: {"username" : getCookie("Username"),
            "limit" : "true"
        },
        success: function(output) {
            var d1 = JSON.parse(output);
            d1.forEach((elem) => {
                var parsed = JSON.parse(elem);
                data.push(parsed);
                console.log(parsed)
            })
        },
        error: function(){
            console.log("Problem in retreiving the latest meals from db")
        }
    });
    //debug localhost
    if(window.location.host == "localhost:3000"){
        console.log("in")
        data = [{id : 130, img: '../res/spaghetti.jfif', title: 'meal1', author: 'Alessio',},{id: 129, img: '../res/burger.jfif',title: 'meal2',author: 'Dylan',},{id: 128, img: '../res/group_meal.webp',title: 'meal3',author: 'Oscar',},];
    }
    console.log(data);
    return data;
}

export let fromServer;
  function onChange(event){ //every time an element is modified from the user this function is called. So it is possible to perform checks for each keystroke if needed
        console.log("on change");
        console.log(event.target.value);
        console.log(event.target.id);
        fromServer[event.target.id] = event.target.value;	
    }
export default function ProfileGrid() {
  const classes = useStyles();
  const [ value, setValue] = React.useState(2);
  const [ hover, setHover] = React.useState(-1);
  const [recentMeals, setRecentMeals] = React.useState(getLatestMeals())

  return (
    <div className={classes.root} >
        <Grid container style={{width:'90%'}}>
            {/* first half of page */}
            <Grid item container xs={6}>
                {/* profile paper */}
                
                    <Paper className={classes.profilePaper}>
                        <Grid item container xs={12} style={{justifyContent: "center"}}>
                            {/* these textfields should be hidden until edit button clicked */}
                            <TextField id="name" label="First Name" style={{fontWeight: "bolder", marginTop: "-8%"}} defaultValue={fromServer["name"]} 
                            />
                            <TextField id="surname" label="Last Name" style={{fontWeight: "bolder", marginTop: "-8%"}} defaultValue={fromServer["surname"]}
                            />
                            {/* edit icon on click reveal textfields and hide label, change (or add another icon) to a save icon when clicked and it switch between them every time */}
                            {/* <EditIcon onClick>
                            </EditIcon> */}
                            
                        </Grid>

                        <Grid item container xs={12} >
                            <Grid item xs={12} style={{justifyContent:"left", display: "flex"}} >
                                <img src={profile} height="400px" width="100%" style={{border: "1px solid #ddd", borderRadius: "15px"}}/>
                            </Grid>

                            <Grid item xs={12}>
                                <Rating
                                    name="hover-feedback"
                                    value={value}
                                    precision={1}
                                    //this code should be put on the view meal page for other users rating the main user's meal event
                                    onChange={(event, newValue) => {
                                    setValue(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                    }}
                                />
                                {/*this explains the rating if we need that... */}
                                {/* {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>} */}
                            </Grid>

                            <Grid item xs={12}>
                                <TextField id="username" onChange={onChange} label="Email Address" fullWidth defaultValue={fromServer["username"]} 
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField id="addressOne" onChange={onChange} label="Address" fullWidth defaultValue={fromServer["addressOne"] + " " + fromServer["addressTwo"]}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField id="postcode" onChange={onChange} label="Postcode" fullWidth defaultValue={fromServer["postcode"]}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField id="city" label="City" onChange={onChange} fullWidth defaultValue={fromServer["city"]}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField id="country" label="Country" onChange={onChange} fullWidth defaultValue={fromServer["country"]}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField id="dob" label="DOB" onChange={onChange} fullWidth defaultValue={fromServer["dob"]}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField id="mobile" label="Mobile Number" onChange={onChange} fullWidth defaultValue={fromServer["mobile"]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
            </Grid>

            {/* second half of page */}
            <Grid item container xs={6}>
                {/* recent meals paper */}
                <Grid item container xs={12}>
                    <Paper className={classes.recentMealsPaper}>
                        <Grid item container xs={12}>
                            <GridList recentMeals={recentMeals}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField id="bio" label="Bio" fullWidth multiline rows={5} rowsMax={5} onChange={onChange} variant="outlined" defaultValue={fromServer["bio"]} style={{marginTop: "8%"}}
                            />
                        </Grid> 
                    </Paper>
                </Grid>
                
                {/* preferences paper */}
                <Grid item container xs={12}>
                    <Paper className={classes.recentMealsPaper}>
                        <Grid item xs={12}>
                            <TextField id="dietary" label="Dietry Requirements" onChange={onChange} fullWidth defaultValue={fromServer["dietary"]}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField id="allergens" label="Allergens" onChange={onChange} fullWidth defaultValue={fromServer["allergens"]}
                            />
                        </Grid>
                    </Paper>
                </Grid>
                
            </Grid>

        </Grid>
    </div>
  );
}

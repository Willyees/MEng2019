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
var fromServer;

const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  };

export default function ProfileGrid() {
  const classes = useStyles();
  const [ value, setValue] = React.useState(2);
  const [ hover, setHover] = React.useState(-1);
  $.ajax({ url: 'PHPF/getuserinfo.php',
      type: 'post',
      async: false,
      data: {"username" : getCookie("Username")},
          success: function(output) {
	      fromServer = JSON.parse(output);
	  }
  });

 

  return (
    <div className={classes.root} >
        <Grid container style={{width:'90%'}}>
            {/* first half of page */}
            <Grid item container xs={6}>
                {/* profile paper */}
                
                    <Paper className={classes.profilePaper}>
                        <Grid item container xs={12} style={{justifyContent: "center"}}>
                            {/* these textfields should be hidden until edit button clicked */}
                            <TextField label="First Name" style={{fontWeight: "bolder", marginTop: "-8%"}} defaultValue={fromServer["name"]} 
                            />
                            <TextField label="Last Name" style={{fontWeight: "bolder", marginTop: "-8%"}} defaultValue={fromServer["surname"]}
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
                                <TextField label="Email Address" fullWidth defaultValue={fromServer["username"]} 
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField label="Address" fullWidth defaultValue={fromServer["addressOne"] + " " + fromServer["addressTwo"]}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField label="Postcode" fullWidth defaultValue={fromServer["postcode"]}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField label="City" fullWidth defaultValue={fromServer["city"]}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField label="Country" fullWidth defaultValue={fromServer["country"]}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField label="DOB" fullWidth defaultValue={fromServer["dob"]}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField label="Mobile Number" fullWidth defaultValue={fromServer["mobile"]}
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
                            <GridList />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Bio" fullWidth multiline rows={5} rowsMax={5} variant="outlined" defaultValue={fromServer["bio"]} style={{marginTop: "8%"}}
                            />
                        </Grid> 
                    </Paper>
                </Grid>
                
                {/* preferences paper */}
                <Grid item container xs={12}>
                    <Paper className={classes.recentMealsPaper}>
                        <Grid item xs={12}>
                            <TextField label="Dietry Requirements" fullWidth defaultValue={fromServer["dietary"]}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Allergens" fullWidth defaultValue={fromServer["allergens"]}
                            />
                        </Grid>
                    </Paper>
                </Grid>
                
            </Grid>

        </Grid>
    </div>
  );
}

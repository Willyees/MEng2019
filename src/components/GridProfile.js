import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridList from '../components/GridList.js';
import EditIcon from '@material-ui/icons/Edit';

import profile from "../res/profile.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
     
  },
  Profilepaper: {
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

export default function ProfileGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid container>
            {/* first half of page */}
            <Grid item container xs={6}>
                {/* profile paper */}
                <Paper className={classes.Profilepaper}>
                    <Grid item container xs={12} style={{justifyContent: "center"}}>
                        {/* these textfields should be hidden until edit button clicked */}
                        <TextField label="First Name" style={{fontWeight: "bolder", marginTop: "-8%"}} 
                        />
                        <TextField label="Last Name" style={{fontWeight: "bolder", marginTop: "-8%"}} 
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
                            <TextField label="Email Address" fullWidth defaultValue="john@example.com" 
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField label="password" fullWidth defaultValue="Password" 
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Address" fullWidth defaultValue="1 old kent road"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Postcode" fullWidth defaultValue="LN1 OKR"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="City" fullWidth defaultValue="London"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Country" fullWidth defaultValue="United Kingdom"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="DOB" fullWidth defaultValue="1/1/0000"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Mobile Number" fullWidth defaultValue="07123 456789"
                            />
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
                            <TextField label="Bio" fullWidth multiline rows={5} rowsMax={5} variant="outlined" defaultValue="I like dinner!" style={{marginTop: "8%"}}
                            />
                        </Grid> 
                    </Paper>
                </Grid>
                
                {/* preferences paper */}
                <Grid item container xs={12}>
                    <Paper className={classes.recentMealsPaper}>
                        <Grid item xs={12}>
                            <TextField label="Dietry Requirements" fullWidth defaultValue="no cheese"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Allergens" fullWidth defaultValue="dogs"
                            />
                        </Grid>
                    </Paper>
                </Grid>
                
            </Grid>

        </Grid>
    </div>
  );
}
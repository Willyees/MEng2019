import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridList from '../components/GridList.js';

import profile from "../res/profile.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function NestedGrid() {
  const classes = useStyles();

//   function FormRow() {
//     return (
//       <React.Fragment>
//         <Grid item lg={2}>
//           <Paper className={classes.paper}>
//               <Image src= {profile}>
//               </Image>
//           </Paper>
//         </Grid>
        
//         {/* <Grid item lg={4}>
//           <Paper className={classes.paper}>item</Paper>
//         </Grid>
//         <Grid item lg={4}>
//           <Paper className={classes.paper}>item</Paper>
//         </Grid> */}
//       </React.Fragment>
//     );
//   }

  return (
    <div className={classes.root}>
        <Paper className={classes.paper}>
            <Grid container spacing={1}>

                <Grid container item lg={6} spacing={2}>
                    <React.Fragment>
                        <Grid item lg={6}>
                            <Paper>
                                <Image src={profile}></Image>
                            </Paper>
                        </Grid>
                    </React.Fragment>
                </Grid>

                <Grid container item lg={6} spacing={2}>
                    <React.Fragment>
                        <Grid item lg={12}>
                            <Paper>
                                <Typography variant="h4" component="h4" gutterBottom>
                                    ProfileName
                                </Typography>
                            </Paper>
                            <Paper>
                                <Typography variant="h5" component="h5" gutterBottom>
                                    city
                                </Typography>
                            </Paper>
                            <Paper>
                                <Button variant="contained" color="primary">
                                    View public meals
                                </Button>
                            </Paper>
                        </Grid>

                        <Grid item lg={12}>
                        <Paper>
                                <GridList/>
                            </Paper>
                        </Grid>

                    </React.Fragment>
                </Grid>

                {/* <Grid container item lg={6} spacing={1}>
                    <React.Fragment>
                    
                    </React.Fragment>
                </Grid> */}

                {/* <Grid container item lg={6} spacing={2}>
                    <React.Fragment>
                        
                    </React.Fragment>
                </Grid> */}
                

                <Grid container item lg={6} spacing={2}>
                    <React.Fragment>
                        <Grid item lg={6}>
                            <Paper>
                                <TextField multiline name="bio" id="bio-mltb" type="text"
                                label="Your bio" variant="outlined"/>
                            </Paper>
                        </Grid>
                    </React.Fragment>
                </Grid>
                {/* <Grid container item lg={4} spacing={3}>
                <FormRow />
                </Grid> */}
            </Grid>
        </Paper>
    </div>
  );
}
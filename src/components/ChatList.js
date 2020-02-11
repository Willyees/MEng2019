import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    //maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  paper:{
    padding: theme.spacing(1),
  },
  grid:{
    overflow: 'auto',
    height: '100%',
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item contatiner xs={12}>
          <Grid item container xs={12}>
            <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">

              <Paper p={1} bgcolor="grey.300" className={classes.paper}>
                  Hey
              </Paper>

            </Box>
          </Grid>
  
          <Box display="flex" flexDirection="row-reverse" p={1} m={1} bgcolor="background.paper">

            <Paper p={1} className= {classes.paper} style={{ background: '#4287f5',}}>
                Yo
            </Paper>

          </Box> 
        </Grid>

        <Grid item xs={12} justify-xs-flex-end>
          <TextField
                multiline rows={1} rowsMax={5} label= "Aa" variant="outlined" fullWidth
            />
        </Grid>
 
      </Grid>
      
      
      
    </div>
  );
}
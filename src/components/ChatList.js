import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    //maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  Paper:{
    padding: theme.spacing(1),
    
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">

        <Paper p={1} bgcolor="grey.300" className={classes.Paper}>
            Hey
        </Paper>

      </Box>
      
      <Box display="flex" flexDirection="row-reverse" p={1} m={1} bgcolor="background.paper">

      <Paper p={1} className= {classes.Paper} style={{ background: '#4287f5',}}>
          Yo
      </Paper>

      </Box>      
    </div>
  );
}
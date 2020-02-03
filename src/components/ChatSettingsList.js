import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,

  },
  inline: {
    display: 'inline',
  },
  large: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    padding: theme.spacing(5),
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
       
        <List className={classes.root}>
            
                <ListItem alignItems="flex-start" style={{justifyContent: 'center'}}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large}/>
                </ListItem>
            
            <Divider variant="fullWidth" style={{marginTop:'10%'}}/>
                <ListItem alignItems="flex-start" style={{justifyContent: 'center'}}>
                <ListItemText
                primary="Option 1"
                />
                </ListItem>
                <Divider variant="fullWidth" style={{marginTop:'10%'}}/>
                <ListItem alignItems="flex-start" style={{justifyContent: 'center'}}>
                <ListItemText
                primary="Option 2"/>
                </ListItem>
                <Divider variant="fullWidth" style={{marginTop:'10%'}}/>
                <ListItem alignItems="flex-start" style={{justifyContent: 'center'}}>
                    <ListItemText
                    primary="Option 3"
                    />
                </ListItem>
        </List>

    </div>
    // style={{transform: 'translate(110%,-15%)'}}
  );
}
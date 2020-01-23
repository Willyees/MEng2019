import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import {isUserLoggedIn} from '../helperFunctions';
import EmojiFoodBeverageSharpIcon from '@material-ui/icons/EmojiFoodBeverageSharp';

const useStyles = makeStyles(theme => ({
    root: {
        flexgrow: 1,
        width: '100%', 
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  export default function ButtonAppBar() {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" color="inherit" >
            < EmojiFoodBeverageSharpIcon /> {/* I'd like it to not show as a button when hovered changes color background */}
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            <a id="title-banner" href="/" >
                MealTime
            </a> 
            </Typography>
            {isUserLoggedIn() ? <Menu /> : <Logged />}
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  function Logged() {
    return (
      <div>
        <Button color="inherit" href="/log-in">Login</Button>
        <Button color="inherit" href="/sign-up">Sign-up</Button>
      </div>
    );
  }

  function Menu() {
    const classes = useStyles();
    return (
      <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
      </IconButton>  
    )
  }
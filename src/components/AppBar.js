import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button';
import {isUserLoggedIn} from '../helperFunctions';
import EmojiFoodBeverageSharpIcon from '@material-ui/icons/EmojiFoodBeverageSharp';
import Link from '@material-ui/core/Link'
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import ExploreIcon from '@material-ui/icons/Explore';

const useStyles = makeStyles(theme => ({
    root: {
        flexgrow: 1,
        width: '100%', 
        appBarSpacer : theme.mixins.toolbar
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    linkbanner:{
      'text-decoration': 'inherit', 
      color: 'white'
    }
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
            <a className={classes.linkbanner} href="/" >
                MealTime
            </a> 
            </Typography>
            {isUserLoggedIn() ? <MenuBanner /> : <Logged />}
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
        <MenuItem val="meals-menu" component={Link} href="#"color="inherit" onClick={handleClose}>My Meals</MenuItem>
        <MenuItem val="show-meals-menu" component={Link} href="/map" color="inherit" onClick={handleClose}>
          <ExploreIcon/>Show me meals
        </MenuItem>
        <MenuItem val="create-meal-menu" component={Link} href="/create-meal" color="inherit" onClick={handleClose}>
          <AddIcon/>Create Meal
        </MenuItem>
        <MenuItem val="settings-menu" component={Link} href="#" color="inherit" onClick={handleClose}>
          <SettingsIcon/>Settings
          </MenuItem>
      </Menu>  
    </div>
    )
  }
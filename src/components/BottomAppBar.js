import React, {Component} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button';
import {isUserLoggedIn, getCookie, getProfilePicURL} from '../helperFunctions';
import EmojiFoodBeverageSharpIcon from '@material-ui/icons/EmojiFoodBeverageSharp';
import Link from '@material-ui/core/Link'
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import ExploreIcon from '@material-ui/icons/Explore';
import LogOutIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Divider from '@material-ui/core/Divider';
import clock from '../res/newspoonandknife_white_all.png';
import $ from 'jquery';
import defaultProfile from "../res/profile.png";
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';


const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles(theme => ({
    root: {
        flexgrow: 1,
        width: '100%', 
        appBarSpacer : theme.mixins.toolbar,
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
        <AppBar style={{bottom:0, position:"relative", top: 'auto'}}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
                <a className={classes.linkbanner} href="/about">
                    About
                </a> 
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

    );
  }
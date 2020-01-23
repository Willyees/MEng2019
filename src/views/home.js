import React, {Component} from 'react';
import AppBar from '../components/AppBar';
import $ from 'jquery';
import { element } from 'prop-types';
import {isUserLoggedIn, getCookie} from '../helperFunctions'

class HomeTemplate extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        //if dont want to see the page flashing before redirecting, have to check user logged in inside the render method (is called before than componentDidMount)
        var un = getCookie("temp");
        if(isUserLoggedIn()){
             //User is logged in, could be of some use
        }
    }

    render() {
        // const classes = useStyles();
        return(
            <AppBar>
            </AppBar>
        );
    }
}

export default HomeTemplate;

import React, {Component} from 'react';
import AppBar from '../components/AppBar';
import $ from 'jquery';
import { element } from 'prop-types';

function getCookie(cookieName) {
    var name = cookieName + "=";
    var decC = decodeURIComponent(document.cookie);
    var tmp = decC.split(';');
    for(var i = 0; i <tmp.length; i++) {
        var c = tmp[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

class HomeTemplate extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        var un = getCookie("temp");
        if(typeof(un) != "undefined" & un !== null){
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

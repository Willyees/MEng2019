import React, {Component} from 'react';
import { FormHelperText } from '@material-ui/core';

export function isUserLoggedIn(){
    console.log("userLoggedIN?");
    var un = getCookie("Username");
    if(typeof(un) === "undefined" || un === null || un.length < 3 
    && window.location.host != "localhost:3000"){ //localhost exception
        console.log("not loggedin");
        return false;
    }
    console.log("logged in");
    return true;
}

export function getCookie(cookieName) {
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
/**
 * function used to format time to a specific format
 * @param time format: "HH:MM:SS"
 */
export function formatTime(time){
    var t_split = time.split(':');
    let ampm = t_split[0] <= 12 ? "AM" : "PM";
    let hh = t_split[0] % 12;
    hh = hh ? hh : 12; //in case hh is 0, then set it back to 12
    return hh + ":" + t_split[1] + " " + ampm; 
}

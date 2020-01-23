import React, {Component} from 'react';
import { FormHelperText } from '@material-ui/core';

export function isUserLoggedIn(){
    console.log("userLoggedIN?");
    var un = getCookie("username");
    if(typeof(un) === "undefined" || un === null || un.length < 3 
    /*&& window.location.host != "localhost:3000"*/){ //localhost exception
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

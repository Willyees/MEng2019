import React, {Component} from 'react';
import { FormHelperText } from '@material-ui/core';
import $ from 'jquery';
import mealPic from "./res/group_meal.webp"


var md5 = require('md5');

export function isUserLoggedIn(){
    var un = getCookie("Username");
    if(typeof(un) === "undefined" || un === null || un.length < 3 
    && window.location.host != "localhost:3000"){ //localhost exception
        console.log("not loggedin");
        return false;
    }
    console.log("logged in");
    return true;
}

export function redirectIfNotLoggedIn(){
    $.ajax({ url: 'PHPF/sessionvalidator.php',
        type: 'post',
        async : false,
        data: {
            "username" : getCookie("Username"),
        },
        success: function(output) {
	        if(output == "0"){
                document.location.href = "/log-in";
                alert("not logged in, redirected to login")
	        }
        },
        error: function(){
            //debug
            if(window.location.host != "localhost:3000"){
                document.location.href = "/log-in";
                alert("problem with checking the login, redirected to login")
            }
        }
    });
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

export function formatTimeNoSecs(time){
    var t_split = time.split(':');
    var t_slice = t_split.slice(0,2)
    return t_slice.join(":")
    
}

export const defaultMealURL = mealPic;
export function getMealPicURL(meal){
    console.log(meal)
    console.log("/meal/" + md5(meal))
    return "/meal/" + md5(meal)
}

export function getProfilePicURL(username){
    return "/prof/" + md5(username)
}


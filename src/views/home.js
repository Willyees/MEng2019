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
        this.submitBtnRef = null;
        //set reference using function (callback pattern)
        this.setSubmitBtnRef = element => {
            this.submitBtnRef = element;
        }
        this.onKeyUp = this.onKeyUp.bind(this);
    }
    componentDidMount() {
        var un = getCookie("temp");
        if(typeof(un) != "undefined" & un !== null){
             $("#txt-user-name").val(un);
        }
    }
    

    onKeyUp(event){
        if(event.target.id == "txt-password" && event.keyCode == "13"){ //13 is Enter key pressed
            this.submitBtnRef.click();
        }
    }

    logUserIn(){
	 $.ajax({ url: 'PHPF/login.php',
            type: 'post',
            data: {
                "usr" : $("#txt-user-name").val(),
	    	"pwd" : $("#txt-password").val()
	    },
            success: function(output) {
                if(output == "DONE"){
		    alert("LOGIN!");
                }
		else{
		    alert("Invalid Credentials");
		}
            }
        });

    }

    redirectSignUp(){
        window.location.href = "/sign-up";
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

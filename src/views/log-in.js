import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import $ from 'jquery';
import {isUserLoggedIn, getCookie} from '../helperFunctions'
import Paper from '@material-ui/core/Paper'
import {Redirect} from 'react-router-dom'

class LogInTemplate extends Component {
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
			document.location = "/map";
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
        return(
            <Container className="main-body" maxWidth="sm">   
            <Paper>
                login Page
		<TextField
		fullWidth
			id="txt-user-name"
			label="Username"
		/>

		<TextField
		fullWidth
			id="txt-password"
			type="password"
            label="Password"
            onChange = {this.onChange}
            onKeyUp = {this.onKeyUp}
		/>                     
		<Button
			id="btn-sign-in" onClick={this.logUserIn} ref={this.setSubmitBtnRef} variant="contained" color="primary" margin="normal" disableElevation >
			Sign In
		</Button>
        
		<Button
			id="btn-sign-up" onClick={this.redirectSignUp} variant="contained" color="secondary" margin="normal" disableElevation >
            Sign Up
		</Button>
	    </Paper>
        </Container>
        
        );
    }
}

export default LogInTemplate;

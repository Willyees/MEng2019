import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import $ from 'jquery';

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
    componentDidMount() {
        var un = getCookie("temp");
        if(typeof(un) != "undefined" & un !== null){
             $("#txt-user-name").val(un);
	}
    }
    logUserIn(){
	 $.ajax({ url: 'login.php',
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
        return(
            <div className="home">
            <Container maxWidth="sm">    
                Home Page
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
		/>                     
		<Button
			id="btn-sign-in" onClick={this.logUserIn} variant="contained" color="primary" margin="normal" disableElevation >
			Sign In
		</Button>

		<Button
			id="btn-sign-up" onClick={this.redirectSignUp} variant="contained" color="secondary" margin="normal" disableElevation >
			Sign Up
		</Button>
	    </Container>
        </div>
        );
    }
}

export default HomeTemplate;

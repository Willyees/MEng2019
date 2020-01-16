import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';


class HomeTemplate extends Component {

    logUserIn(){
	alert("It works");
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
			value=""
		/>

		<TextField
		fullWidth
			id="txt-password"
			label="Password"
			value=""
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

import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

class LogInTemplate extends Component {
    render() {
        return(
            <div className="login">
            <Container maxWidth="sm">    
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
	    </Container>
        </div>
        );
    }
}

export default LogInTemplate;
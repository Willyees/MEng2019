import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import $ from 'jquery';
import {isUserLoggedIn, getCookie} from '../helperFunctions'
import Paper from '@material-ui/core/Paper'
import {Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Bear1 from '../res/bear1.png';

import board from "../res/chopping_board_chopped.png";
import { fontSize } from '@material-ui/system';

let hasChanged = false;



class LogInTemplate extends Component {
	constructor(props){
        super(props);

        this.state= {
            username: null,
            password: null,

            formErrors: {
                username: "",
                password: "",
            }
        }

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

    onChange = event => {
        event.preventDefault();
        
        const name = event.target;

        switch(name){
            case 'username':
                hasChanged = true;
            break;
            case 'password':
                hasChanged= true;
            break;

            default:
            break; 
        }
    }

    onSubmit = event => {
        event.preventDefault();

        let formErrors = this.state.formErrors;    

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
                if(hasChanged){
                    this.state.formErrors.password = "possible invalid credential";
                    this.state.formErrors.username = "possible invalid credential";
        
                    this.setState({formErrors, name: formErrors.value});
                } 
            }
        }
        });
    }

    redirectSignUp(){
        window.location.href = "/sign-up";
    }

    render() {
        const { formErrors } = this.state;
        return(   
            <Grid className= "main-body" container xs={12} style={{marginLeft:"0%"}}>
                <Grid item container xs={6} style={{marginLeft:"0%", marginTop:"2%", paddingLeft:"2%", paddingRight:"2%"}}>
                    <Paper style={{marginTop:"5%", marginLeft:"0%", marginRight:"2%", "background-image" : `url(${board})`, backgroundSize: "cover", marginBottom:"5%"}}>
                        <div style={{padding:"10%"}}> -> MealTime connects 1000s of users worldwide! </div>
                        <div style={{padding:"10%"}}> -> Allowing users to be able to connect and share meals together</div>
                        <div style={{padding:"10%"}}> -> Find meals near you by clicking on markers on the map in the map page</div>
                    </Paper>
                </Grid>
                <Grid item container xs={6} style={{marginTop:"2%",marginRight:"0%", marginTop:"2%", paddingLeft:"2%", paddingRight:"2%"}}>
                    <Paper style={{marginBottom:"5%",padding:"12%", marginTop:"5%",marginRight: "0%","background-image" : `url(${board})`, backgroundSize: "cover"}}>
                        <form onSubmit={this.onSubmit}>
                            <TextField
                                fullWidth
                                style={{marginTop:"10%"}}
                                id="txt-user-name"
                                name="username"
                                label="Username"
                                error= {formErrors.username} 
                                helperText= {formErrors.username}
                                onChange={this.onChange}
                                ref={usernameRef => this.username = usernameRef}
                                onSubmit={this.onSubmit}
                                variant="outlined"
                            />

                            <TextField
                                fullWidth
                                style={{marginTop:"5%", marginBottom:"3%"}}
                                id="txt-password"
                                name="password"
                                type="password"
                                label="Password"
                                onChange = {this.onChange}
                                onKeyUp = {this.onKeyUp}
                                error= {formErrors.password} 
                                helperText= {formErrors.password}
                                onChange={this.onChange}
                                ref={passwordRef => this.password = passwordRef}
                                onSubmit={this.onSubmit}
                                variant="outlined"
                            />
                            <div style={{marginTop:"5%", marginBottom:"5%", fontSize:18}}>
                                -> See what meals you can join in right now
                            </div>

                            <div >
                                Join MealTime today.
                            </div>               
                            <Button
                                id="btn-sign-in" type="submit" ref={this.setSubmitBtnRef} variant="contained" color="primary" margin="normal" disableElevation style={{marginRight:"2%"}}>
                                Sign In
                            </Button>
                            
                            <Button
                                id="btn-sign-up" onClick={this.redirectSignUp} variant="contained" color="secondary" margin="normal" disableElevation style={{marginLeft:"2%"}}>
                                Sign Up
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default LogInTemplate;

import React, {Component} from 'react';
import {useState} from 'react';
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import {MuiPickersUtilsProvider, KeyboardDatePicker, DatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import 'date-fns'
import $ from 'jquery';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import GridList from '../components/GridList.js';
import SaveIcon from '@material-ui/icons/Save';
import profile from "../res/profile.png";
import Rating from '@material-ui/lab/Rating';

import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import AppBar from '../components/AppBar.js';

import board from "../res/chopping_board_chopped.png";

import myStyle from "../mystyle.module.css";

const postcodeRegex = RegExp(/^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/);

const phoneNumberRegex = RegExp(/^((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}$/g);

//will check to see if everythings valid before sending data to db
const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    
    return valid;
};

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    profilePaper: {
      padding: theme.spacing(10),
      // textAlign: 'center',
      color: theme.palette.text.secondary,
      
    },
    recentMealsPaper:{
      padding: theme.spacing(6),
      width:'100%',
      // textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

class SignUpTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
            fName : null,
            lName: null,
            username: null,
            password: null,
            password_c: null,
            address_1: null,
            address_2: null,
            postcode: null,
            city: null,
	    file:null,
            country: null,
            dob:  null, //date and time will need to use a graphical calendar. At the moment are visualised for debug purposes
            phone: null,
            dietary: null,
            bio: null,
            profilePic: null,
            allergens: null,
            //visibility for passwords
            isPasswordVis : true,
            isPasswordCVis : true,


            formErrors: {
                fName : "",
                lName: "",
                username: "",
                password: "",
                password_c: "",
                address_1: "",
                postcode: "",
                city: "",
                country: "",
                phone: "",
            }
        }
    }

    
    
    handleDOB = date_ => { //date is handled differently (not like an event)
        let formErrors = this.state.formErrors;
        formErrors.dob =
                    date_.getFullYear() >= new Date().getFullYear()
                    ? "dob can't be in current year"
                    : "";
        this.setState({formErrors, dob : date_}, () => console.log(this.state));
    };

    //using two different functions because the event received has no info related to which icon called it (so can't understand which password state to modify)
    setVisibilityPass = () =>{
        this.setState({isPasswordVis : !this.state.isPasswordVis});
    }
    setVisibilityPassC = () =>{
        this.setState({isPasswordCVis : !this.state.isPasswordCVis});
    }

    onChange = event => {//every time an element is modified from the user this function is called. So it is possible to perform checks for each keystroke if needed
        event.preventDefault();
        const { name, value} = event.target;
        let formErrors = this.state.formErrors;

        switch(name){

            //not sure how to test the username to see if its already in db so I have left the username check for now, should go here like the others though.

            case 'password':
                formErrors.password = 
                    value.length < 6 
                    ? "minimum 6 characters required"
                    : "";
                break;
            case 'password_c':
                formErrors.password_c = 
                (value.match(this.state.password) && (value.length == this.state.password.length))
                    ? ""
                    : "passwords must match"
                break;
            case 'address_1':
                formErrors.address_1 =
                    value.length < 3 
                    ? "minimum 3 characters required"
                    : "";
                break;

            //address 2 not required as it is an optional field

            case 'postcode':
            formErrors.postcode = 
                postcodeRegex.test(value)
                ? ""
                : "postcode should be a uk postcode";
                break;
            case 'city':
                formErrors.city =
                    value.length < 3 
                    ? "minimum 3 characters required"
                    : "";
                break;
            case 'country':
                formErrors.country =
                    value.length < 3 
                    ? "minimum 3 characters required"
                    : "";
                break;
            
            //dob handled in dobhandler()

            case 'phone':
                formErrors.phone =
                    phoneNumberRegex.test(value)
                    ? ""
                    : "phone number should match uk mobile number";
                break;
            
            
            default:
            break;        
        }

        this.setState({formErrors, [name]: value }, () => console.log(this.state));

    };

    onSubmit = event => {
        event.preventDefault();
        if(formValid(this.state.formErrors)){
            //add to this function the connection to the DB. can retreive all the inputs values from 'this.state'. care: they are stored all as strings at the moment (JS dynamic types)
            const {fName, bio, city} = this.state;
		    const fd = new FormData();
    fd.append('image', this.state.file, this.state.file.name);
            //^dunno if other elements can be added to the line above (db) so i've just left it for now^
            $.ajax({ url: 'PHPF/signup.php',
                type: 'post',
		 enctype: 'multipart/form-data',
                data: {"data" : this.state, "test" : fd},
                success: function(output) {
		    alert(output);
                    if(output == "DONE"){
                            window.location.href = "/" 
                    }
                    else if(output == 1){
                        alert("Username Already Exists");
                    }else{
			alert(output);
		    }
                }
            });
        } else{
            console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
            alert("Form invalid, please check again");
        }
        
    };

    handleImageChange = event => {
        event.preventDefault();
    
      let reader = new FileReader();
      let file = event.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            imagePreviewUrl: reader.result,
	    file: file,
          });
        }

       if (event.target.files[0]) {reader.readAsDataURL(file);}

      };


    render() {
        const { formErrors } = this.state;
        const classes = useStyles;

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        //problem with the image size, I want it to remain the same dimensions but it always grows with the page...
        if (imagePreviewUrl) {
            $imagePreview = (
                <div style={{maxHeight:'100%', maxWidth: '100%', height:'100%', width:'100%'}}>
                    <img src={imagePreviewUrl} id="uploadme"
                        className= {myStyle.image} style={{ contentFit:'contain',height: '100%', width:'100%', maxHeight:'100%', maxWidth:'100%',
                        border: "1px solid #ddd", borderRadius: "15px", 
                        }}
                   />
                </div>
            );

        } 
        else {
        $imagePreview = (
                <div style={{maxHeight:'100%', maxWidth: '100%', height:'100%', width:'100%'}}>
                    <img src={profile} id="uploadme" height="100%" width="100%" className= {myStyle.image} style={{
                        contentFit:'contain',border: "1px solid #ddd", borderRadius: "15px", 
                        }} 
                    />
                </div>
            )
        }

        // const [ value, setValue] = React.useState(2);
        // const [ hover, setHover] = React.useState(-1);
        return(

            <div className={classes.root}>
                <form id="fm" onSubmit={this.onSubmit} enctype="multipart/form-data">
                <Grid container style={{width:'75%', marginLeft:'19%'}}>
                    {/* first half of page */}
                    <Grid item container xs={6} style={{marginTop:'7.5%', maxWidth:'40%', marginBottom:'7.5%'}}>
                        {/* profile paper */}
                        
                            <Paper className={classes.profilePaper} style={{padding:'5%', "background-image" : `url(${board})`}}>
                                <Grid item container xs={12} style={{justifyContent: "center"}}>
                                    {/* these textfields should be hidden until edit button clicked */}
                                    {/* <TextField label="First Name" style={{fontWeight: "bolder", marginTop: "-8%"}} 
                                    /> */}

                                    <TextField error= {formErrors.fName} helperText= {formErrors.fName} name="fName" id="first-name-tb" onChange={this.onChange} value={this.fName} type="text" label="First Name" style={{fontWeight: "bolder", color: 'red'}} />

                                    {/* <TextField label="Last Name" style={{fontWeight: "bolder", marginTop: "-8%"}}/> */}

                                    <TextField error= {formErrors.lName} helperText= {formErrors.lName} name="lName" id="last-name-tb" onChange={this.onChange} value={this.lName} type="text" label="Last Name" style={{fontWeight: "bolder"}} />

                                    {/* edit icon on click reveal textfields and hide label, change (or add another icon) to a save icon when clicked and it switch between them every time */}
                                    {/* <EditIcon onClick>
                                    </EditIcon> */}
                                    
                                </Grid>

                                <Grid item container xs={12} >
                                    <Grid item xs={12} style={{justifyContent:"left", display: "flex"}} >
                                        <div className={ myStyle.container }>
                                         {/* style={{width:"100%", position: 'relative'}} */}
                                            {$imagePreview}
                                                {/* // opacity: 1,
                                                // display: 'block',
                                                // transition: '.5s ease',
                                                // backfaceVisibility: 'hidden', */}
                                            
                                             <div className= {myStyle.middle}>
                                            {/*style={{
                                                transition: '.5s ease',
                                                opacity: 0,
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                MsTransform: 'translate(-50%, -50%)',
                                                textAlign: 'center'}} */}
                                            
                                                 <div className= {myStyle.text} >
                                                {/*style={{
                                                    backgroundColor: '#4CAF50',
                                                    color: 'white',
                                                    fontSize: '16px',
                                                    padding: '16px 32px',}} */}
                                                
                                                    
                                                    <input className="fileInput" 
                                                    type="file"
						    id="up2"
                                                    onChange={this.handleImageChange}  />
                                                </div>

                                            </div>
                                        </div>
                                    </Grid>

                                    {/* <Grid item xs={12}>
                                        <Rating
                                            name="hover-feedback"
                                            value={value}
                                            precision={1}
                                            //this code should be put on the view meal page for other users rating the main user's meal event
                                            onChange={(event, newValue) => {
                                            setValue(newValue);
                                            }}
                                            onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                            }}
                                        />
                                        {/*this explains the rating if we need that... */}
                                        {/* {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>} */}
                                    {/* </Grid> */}

                                    <Grid item xs={12}>
                                        <TextField label="Email Address" fullWidth defaultValue="john@example.com" name="username" value={this.username} onChange={this.onChange}
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        {/* <TextField label="password" fullWidth defaultValue="Password" 
                                        /> */}

                                        <TextField error= {formErrors.password} helperText= {formErrors.password} name="password" type={this.state.isPasswordVis ? "password" : "text"} id="password-tb" onChange={this.onChange} value={this.password} label="Password" fullWidth
                                        InputProps={{
                                            endAdornment:<InputAdornment position="end">
                                                <IconButton onClick={this.setVisibilityPass}>{this.state.isPasswordVis ? <VisibilityOff /> : <Visibility />}</IconButton>
                                            </InputAdornment>}}>
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField error= {formErrors.password_c} helperText= {formErrors.password_c} name="password_c" type={this.state.isPasswordCVis ? "password" : "text"} id="password_c-tb" onChange={this.onChange} value={this.password_c} label="Confirm Password" fullWidth                        
                                        InputProps={{
                                            endAdornment:<InputAdornment position="end">
                                                <IconButton onClick={this.setVisibilityPassC}>{this.state.isPasswordCVis ? <VisibilityOff /> : <Visibility />}</IconButton>
                                            </InputAdornment>}}>
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={12}>
                                        {/* <TextField label="Address" fullWidth defaultValue="1 old kent road"
                                        /> */}

                                        <TextField error= {formErrors.address_1} helperText= {formErrors.address_1} name="address_1" id="address_1-tb" onChange={this.onChange} value={this.address_1} type="text" label="Address Line 1" fullWidth/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField error= {formErrors.address_2} helperText= {formErrors.address_2} name="address_2" id="address_2-tb" onChange={this.onChange} value={this.address_2} type="text" label="Address Line 2" fullWidth/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        {/* <TextField label="Postcode" fullWidth defaultValue="LN1 OKR"
                                        /> */}

                                        <TextField error= {formErrors.postcode} helperText= {formErrors.postcode} name="postcode" id="postcode-tb" onChange={this.onChange} value={this.postcode} type="text" label="Postcode" fullWidth/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        {/* <TextField label="City" fullWidth defaultValue="London"
                                        /> */}

                                        <TextField error= {formErrors.city} helperText= {formErrors.city} name="city" id="city-tb" onChange={this.onChange} value={this.city} type="text" label="City" fullWidth/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        {/* <TextField label="Country" fullWidth defaultValue="United Kingdom"
                                        /> */}

                                        <TextField error= {formErrors.country} helperText= {formErrors.country} name="country" id="country-tb" onChange={this.onChange} value={this.country} type="text" label="Country" fullWidth/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        {/* <TextField label="DOB" fullWidth defaultValue="1/1/0000"
                                        /> */}

                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker fullWidth error= {formErrors.dob} helperText= {formErrors.dob} name="dob" id="dobdate" margin="normal" clearable autoOk={true} disableOpenOnEnter variant="inline" label="Date of Birth" format="dd/MM/yyyy"
                                            value={this.state.dob} onChange={this.handleDOB} />
                                        </MuiPickersUtilsProvider>
                                    </Grid>

                                    <Grid item xs={12}>
                                        {/* <TextField label="Mobile Number" fullWidth defaultValue="07123 456789"
                                        /> */}

                                        <TextField error= {formErrors.phone} helperText= {formErrors.phone} name="phone" id="phone-tb" onChange={this.onChange} value={this.phone} type="text" label="Phone Number" fullWidth/>
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                        

                                         <Button variant="contained" color="primary" startIcon={<AddIcon />} type="submit">
                                            Sign Up
                                        </Button>
                                    </Grid> */}
                                </Grid>
                            </Paper>
                    </Grid>

                    {/* second half of page */}
                    <Grid item container xs={6} style={{marginTop:'7.5%', marginLeft:'2.5%', maxWidth:'40%'}}>
                        {/* recent meals paper */}
                        <Grid item container xs={12} style={{maxHeight:'40%'}}>
                            <Paper className={classes.recentMealsPaper} style={{padding:'5%',"background-image" : `url(${board})`, height: '100%',maxHeight: '100%',maxWidth:'90%'}}>
                                <Grid item container xs={12}>
                                    <GridList />
                                </Grid>

                                <Grid item xs={12}>
                                    {/* <TextField label="Bio" fullWidth multiline rows={5} rowsMax={5} variant="outlined" defaultValue="I like dinner!" style={{marginTop: "8%"}}
                                    /> */}

                                    <TextField multiline name="bio" id="bio-mltb" onChange={this.onChange} value={this.bio} type="text"
                                    label="Your bio" fullWidth multiline rows={5} rowsMax={5} variant="outlined" style={{marginTop: "8%"}}/>
                                </Grid> 
                            </Paper>
                        </Grid>
                        
                        {/* preferences paper */}
                        <Grid item container xs={12} style={{width:'40%', marginTop:'7.5%'}}>
                            <Paper style={{width:'100%', padding:'5%',marginBottom:'18.7%', "background-image" : `url(${board})`}}>
                                    
                                <TextField name="dietary" id="dietary-ddmenu" onChange={this.onChange} value={this.dietary} label="Dietary requirements" fullWidth variant="outlined" multiline rows={3} style={{marginBottom:"5%", marginTop:"20%"}}/>

                                <Grid item xs={12}>

                                    <TextField multiline name="allergens" id="allergens-mltb" onChange={this.onChange} value={this.allergens} type="text" rows={3}label="Allergens" variant="outlined" fullWidth/>
                                </Grid>
                            </Paper>
                        </Grid>
                        
                    </Grid>
                    
                </Grid>
                {/* footer */}
                
                <div class='fixed' style={{width:'100%', position:'fixed', bottom:0,
                left: 0,
                backgroundColor: 'rgb(76, 175, 80, 0.6)',
                color: 'white',
                textAlign: 'center'}}>
                    <Button
                        variant="contained"
                        size="medium"
                        color= 'primary'
                        className={classes.button}
                        startIcon={<AddIcon />}
                        type="submit"
                        style={{margin:'0.5%'}}
                        
                    >
                        Sign Up
                    </Button>
                </div>
                
                </form>
            </div>
            
            // <div className="main-body">
            //     SignUp page
            //     <div>
            //         <p />
            //     </div>
            //     <Grid container justify="center">
            //         <Grid item>
            //     <form onSubmit={this.onSubmit}> 
            //     <Paper>
            //         <div>
            //             <TextField error= {formErrors.fName} helperText= {formErrors.fName} name="fName" id="first-name-tb" onChange={this.onChange} value={this.fName} type="text" label="First Name"/>
            //         </div>
            //         <div>
            //             <TextField error= {formErrors.lName} helperText= {formErrors.lName} name="lName" id="last-name-tb" onChange={this.onChange} value={this.lName} type="text" label="Last Name"/>
            //         </div>
            //         <div>
            //             <TextField error= {formErrors.username} helperText= {formErrors.username} name="username" id="username-tb" onChange={this.onChange} value={this.username} type="text" label="Username" />
            //         </div>
            //         <div>
            //             <TextField error= {formErrors.password} helperText= {formErrors.password} name="password" type={this.state.isPasswordVis ? "password" : "text"} id="password-tb" onChange={this.onChange} value={this.password} label="Password" 
            //             InputProps={{
            //                 endAdornment:<InputAdornment position="end">
            //                     <IconButton onClick={this.setVisibilityPass}>{this.state.isPasswordVis ? <VisibilityOff /> : <Visibility />}</IconButton>
            //                 </InputAdornment>}}>
            //             </TextField>
            //         </div>
            //         <div>
            //             <TextField error= {formErrors.password_c} helperText= {formErrors.password_c} name="password_c" type={this.state.isPasswordCVis ? "password" : "text"} id="password_c-tb" onChange={this.onChange} value={this.password_c} label="Confirm Password"                         
            //             InputProps={{
            //                 endAdornment:<InputAdornment position="end">
            //                     <IconButton onClick={this.setVisibilityPassC}>{this.state.isPasswordCVis ? <VisibilityOff /> : <Visibility />}</IconButton>
            //                 </InputAdornment>}}>
            //             </TextField>
            //         </div>
            //         <div>
            //             <TextField error= {formErrors.address_1} helperText= {formErrors.address_1} name="address_1" id="address_1-tb" onChange={this.onChange} value={this.address_1} type="text" label="Address Line 1" />
            //         </div>
            //         <div>
            //             <TextField error= {formErrors.address_2} helperText= {formErrors.address_2} name="address_2" id="address_2-tb" onChange={this.onChange} value={this.address_2} type="text" label="Address Line 2" />
            //         </div>
            //         <div>
            //             <TextField error= {formErrors.postcode} helperText= {formErrors.postcode} name="postcode" id="postcode-tb" onChange={this.onChange} value={this.postcode} type="text" label="Postcode" />
            //         </div>
            //         <div>
            //             <TextField error= {formErrors.city} helperText= {formErrors.city} name="city" id="city-tb" onChange={this.onChange} value={this.city} type="text" label="City" />
            //         </div>
            //         <div>
            //             <TextField error= {formErrors.country} helperText= {formErrors.country} name="country" id="country-tb" onChange={this.onChange} value={this.country} type="text" label="Country" />
            //         </div>
            //         <div>
            //             <MuiPickersUtilsProvider utils={DateFnsUtils}>
            //                 <KeyboardDatePicker error= {formErrors.dob} helperText= {formErrors.dob} name="dob" id="dobdate" margin="normal" clearable autoOk={true} disableOpenOnEnter variant="inline" label="Date of Birth" format="dd/MM/yyyy"
            //                 value={this.state.dob} onChange={this.handleDOB} />
            //             </MuiPickersUtilsProvider>
            //         </div>
            //         <div>
            //             <TextField error= {formErrors.phone} helperText= {formErrors.phone} name="phone" id="phone-tb" onChange={this.onChange} value={this.phone} type="text" label="Phone Number" />
            //         </div>
            //         <div>
            //             <TextField name="dietary" id="dietary-ddmenu" onChange={this.onChange} value={this.dietary} label="Dietary requirements"/> {/*at the moment is a text box. Once DB connection is set up, should retreive multiple choices from DB and use a <select />*/}
            //         </div>
            //         <div>
            //             <TextField multiline name="bio" id="bio-mltb" onChange={this.onChange} value={this.bio} type="text"
            //             label="Your bio" variant="outlined"/>
            //         </div>
                    
            //         <div>
            //             <TextField name="profilepic" id="profilePic" onChange={this.onChange} value={this.profilePic} type="text" label="Where a pic should go" />
            //         </div>
            //         <div>
            //             <TextField multiline name="allergens" id="allergens-mltb" onChange={this.onChange} value={this.allergens} type="text" label="Allergens" variant="outlined"/>
            //         </div>
            //         <div>

            //         </div>
            //         <Button variant="contained" color="primary" startIcon={<AddIcon />} type="submit">
            //             Sign Up
            //         </Button>
            //         </Paper>
            //     </form>
            //     </Grid>
            //     </Grid>
            // </div>
        );
    }
}

export default SignUpTemplate;

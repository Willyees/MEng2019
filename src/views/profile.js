import React, {Component} from 'react';
import AppBar from '../components/AppBar.js';
import ProfileGrid from '../components/GridProfile.js';
// import {fromServer} from '../components/GridProfile.js';
import $ from 'jquery';

import {useState} from 'react';
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import {MuiPickersUtilsProvider, KeyboardDatePicker, DatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {getCookie, getProfilePicURL, isUserLoggedIn, redirectIfNotLoggedIn} from '../helperFunctions';


import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import GridList from '../components/GridList.js';
import SaveIcon from '@material-ui/icons/Save';
import profile from "../res/profile.png";
import Rating from '@material-ui/lab/Rating';

import { makeStyles, rgbToHex } from '@material-ui/core/styles';

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
let fromServer;
var copyInitial;
let profilePicURL = getProfilePicURL(getCookie("Username"));
class ProfileTemplate extends Component {
    constructor(props){
        super(props);
	redirectIfNotLoggedIn();
        this.state = {
            fName : null,
            lName: null,
            username: null,
            address_1: null,
            address_2: null,
            postcode: null,
            city: null,
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
        this.setState(date_);
    };
    
    componentDidMount() {
	//Copy initial data to see what is changed
	   // copyInitial = fromServer;
        copyInitial = Object.assign({}, fromServer);
    }

    onChange = event => {//every time an element is modified from the user this function is called. So it is possible to perform checks for each keystroke if needed
        event.preventDefault();
        const { name, value} = event.target;
        let formErrors = this.state.formErrors;
        

        switch(name){

            //not sure how to test the username to see if its already in db so I have left the username check for now, should go here like the others though.
            case 'fName':
                formErrors.fName =
                    value.length > 0
                    ? ""
                    : "please fill this field"
                break;
            case 'lName':
                formErrors.fName =
                    value.length > 0
                    ? ""
                    : "please fill this field"
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
        
        // if(typeof(event.target.value) !== undefined){
        //     console.log(fromServer);
            fromServer[event.target.id] = event.target.value;
        // }
    };

    onSubmit = event => {
        event.preventDefault(); //stop page reload

        //checking errors
        if(formValid(this.state.formErrors)){
            //Loop through fromServer array, see if anything has changed
            let toServer = {};
            let flag = 0;
            console.log("INITIAL");
            console.log(copyInitial);
            $.each(fromServer, function(key, valueObj){
                if(valueObj != copyInitial[key]){ //DONT use !==
                //Something has changed at it needs updating
                //IMPORTANT: This working relies on the ID's of the textfields in GridProfile
                //Been the same as the database ids kinda confusing
                toServer[key] = valueObj;
                flag = 1;
                }
            });
            //Lets pass this to the server, then clear the toServer array. 	
            //Should only call if toServer is not empty, but easy to check that with PHP
            console.log(toServer);
            if(flag == 1){
                $.ajax({ url: 'PHPF/updateuserinfo.php',
                    type: 'post',
                    async: false,
                    data: {
                        "username" : copyInitial["username"], 
                        "update" : toServer
                    },
                    success: function(output) {
                            alert(output);
                        if(output == "DONE"){
                        alert("Records Updated");
                        }
                        else{
                        alert("failed");
                        }
                    }
                });
            }
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
            file: file,
            imagePreviewUrl: reader.result
          });
        }

        if (event.target.files[0]) {reader.readAsDataURL(file);}
      };
      

    render() {
        const { formErrors } = this.state;
        const classes = useStyles;
        
        let {imagePreviewUrl} = this.state;
        let $imagePreview = profilePicURL;

        $.ajax({ url: 'PHPF/getuserinfo.php',
            type: 'post',
            async: false,
             data: {"username" : getCookie("Username")},
                success: function(output) {
	            fromServer = JSON.parse(output);
	        }
        });

        //problem with the image size, I want it to remain the same dimensions but it always grows with the page...
        if (imagePreviewUrl) {
            $imagePreview = (
                <div style={{maxHeight:'100%', maxWidth: '100%', height:'100%', width:'100%'}}>
                    <img src={profilePicURL} 
                        className= {myStyle.image} id="profilePic" style={{ contentFit:'contain',height: '100%', width:'100%', maxHeight:'100%', maxWidth:'100%',
                        border: "1px solid #ddd", borderRadius: "15px", 
                        }}
                    />
                </div>
            );

        } 
        else {
        $imagePreview = (
                <div style={{maxHeight:'100%', maxWidth: '100%', height:'100%', width:'100%'}}>
                    <img src={profilePicURL} height="100%" width="100%" className= {myStyle.image} id="profilePic" style={{
                        contentFit:'contain',border: "1px solid #ddd", borderRadius: "15px", 
                        }} 
                    />
                </div> 
            )
        }

        return(
            <div className={classes.root}>
                <form onSubmit={this.onSubmit}>
                <Grid container style={{width:'75%', marginLeft:'19%'}}>
                    {/* first half of page */}
                    <Grid item container xs={6} style={{marginTop:'7.5%', maxWidth:'40%', marginBottom:'7.5%'}}>
                        {/* profile paper */}
                        
                            <Paper className={classes.profilePaper} style={{padding:'5%', "background-image" : `url(${board})`}}>
                                <Grid item container xs={12} style={{justifyContent: "center"}}>
                                    {/* these textfields should be hidden until edit button clicked */}
                                    {/* <TextField label="First Name" style={{fontWeight: "bolder", marginTop: "-8%"}} 
                                    /> */}

                                    <TextField error= {formErrors.fName} helperText= {formErrors.fName} name="fName" id="name" onChange={this.onChange} value={this.fName} type="text" label="First Name" style={{fontWeight: "bolder", color: 'red'}} defaultValue={fromServer["name"]} />
                                    

                                    {/* <TextField label="Last Name" style={{fontWeight: "bolder", marginTop: "-8%"}}/> */}

                                    <TextField error= {formErrors.lName} helperText= {formErrors.lName} name="lName" id="surname" onChange={this.onChange} value={this.lName} type="text" label="Last Name" style={{fontWeight: "bolder"}} defaultValue={fromServer["surname"]} />
                                    
                                    

                                    {/* edit icon on click reveal textfields and hide label, change (or add another icon) to a save icon when clicked and it switch between them every time */}
                                    {/* <EditIcon onClick>
                                    </EditIcon> */}
                                    
                                </Grid>

                                <Grid item container xs={12} >
                                    <Grid item xs={12} style={{justifyContent:"left", display: "flex"}} >
                                        <div className={ myStyle.container }>
                                            {$imagePreview}
                                             <div className= {myStyle.middle}>
                                                 <div className= {myStyle.text} >  
                                                    <input className="fileInput" 
                                                    type="file"
                                                    onChange={this.handleImageChange}
                                                    id="profilePic" />
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Rating
                                            name="read-rating"
                                            value={5}
                                            precision={1}
                                            id="rating"
                                            
                                            //this code should be put on the view meal page for other users rating the main user's meal event
                                            readOnly
                                        />

                                        {/* oscar stuff */}
                                        {/* value={fromServer["rating"]}  */}

                                        {/*this explains the rating if we need that... */}
                                        {/* {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>} */}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField id="username" label="Email Address" fullWidth defaultValue={fromServer["username"]} 
                                        />
                                        
                                    </Grid>

                                    <Grid item xs={12}>

                                        <TextField error= {formErrors.address_1} helperText= {formErrors.address_1} name="address_1" id="addressOne" onChange={this.onChange} value={this.address_1} type="text" label="Address Line 1" fullWidth defaultValue={fromServer["addressOne"]} />

                                        
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField error= {formErrors.address_2} helperText= {formErrors.address_2} name="address_2" id="addressTwo" onChange={this.onChange} value={this.address_2} type="text" label="Address Line 2" fullWidth defaultValue={fromServer["addressTwo"]}/>

                                        
                                        
                                    </Grid>

                                    <Grid item xs={12}>

                                        <TextField error= {formErrors.postcode} helperText= {formErrors.postcode} name="postcode" id="postcode" onChange={this.onChange} value={this.postcode} type="text" label="Postcode" fullWidth defaultValue={fromServer["postcode"]}/>
                                        
                                    </Grid>

                                    <Grid item xs={12}>

                                        <TextField error= {formErrors.city} helperText= {formErrors.city} name="city" id="city" onChange={this.onChange} value={this.city} type="text" label="City" fullWidth defaultValue={fromServer["city"]}/>
                                        
                                    </Grid>

                                    <Grid item xs={12}>

                                        <TextField error= {formErrors.country} helperText= {formErrors.country} name="country" id="country" onChange={this.onChange} value={this.country} type="text" label="Country" fullWidth defaultValue={fromServer["country"]}/>

                                        
                                        
                                    </Grid>

                                    <Grid item xs={12}>

                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker fullWidth error= {formErrors.dob} helperText= {formErrors.dob} name="dob" id="dob" margin="normal" clearable autoOk={true} disableOpenOnEnter variant="inline" label="Date of Birth" format="dd/MM/yyyy"
                                            value={fromServer["dob"]} onChange={this.handleDOB} />
                                        </MuiPickersUtilsProvider>
                                        
                                    </Grid>

                                    <Grid item xs={12}>

                                        <TextField error= {formErrors.phone} helperText= {formErrors.phone} name="phone" id="mobile" onChange={this.onChange} value={this.phone} type="text" label="Phone Number" fullWidth defaultValue={fromServer["mobile"]}/>

                                        
                                    </Grid>
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
                                    <TextField multiline name="bio" id="bio" onChange={this.onChange} value={this.bio} type="text"
                                    label="Your bio" fullWidth multiline rows={5} rowsMax={5} variant="outlined" style={{marginTop: "8%"}} defaultValue={fromServer["bio"]}/>
                                    
                                </Grid> 
                            </Paper>
                        </Grid>
                        
                        {/* preferences paper */}
                        <Grid item container xs={12} style={{width:'40%', marginTop:'7.5%'}}>
                            <Paper style={{width:'100%', padding:'5%',marginBottom:'18.7%', "background-image" : `url(${board})`}}> 

                                <TextField name="dietary" id="dietary" onChange={this.onChange} value={this.dietary} label="Dietary requirements" fullWidth variant="outlined" multiline rows={3} style={{marginBottom:"5%", marginTop:"20%"}} defaultValue={fromServer["dietary"]}/>
                                

                                <Grid item xs={12}>

                                    <TextField multiline name="allergens" id="allergens" onChange={this.onChange} value={this.allergens} type="text" rows={3}label="Allergens" variant="outlined" fullWidth defaultValue={fromServer["allergens"]}/>
                                    
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
                        startIcon={<SaveIcon />}
                        type="submit"
                        style={{margin:'0.5%'}}
                        
                    >
                        Update
                    </Button>
                </div>
                </form>
            </div>
        );
    }
}

export default ProfileTemplate;

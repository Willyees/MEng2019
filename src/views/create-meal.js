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
import $ from 'jquery'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Typography, MenuItem } from '@material-ui/core';
import { getCookie, isUserLoggedIn, formatTimeNoSecs, redirectIfNotLoggedIn} from '../helperFunctions';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';

import meal from "../res/burger.png";

import myStyle from "../mystyle.module.css";

import board from "../res/repeatable_chop_board.png"
import bear from "../res/bear1.png";

const postcodeRegex = RegExp(/^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/);


const styles = ({
    age_range : {
        color: 'rgba(0, 0, 0, 0.54)',
        'font-size': '1rem',
        'line-height': 1,
        'letter-spacing': '0.00938em',
        transform : 'scale(0.75)',
        'transform-origin' : 'top left',
    },
    padded : {
        padding : '1rem'
    },
    widepadded : {
        padding : '1rem',
        "padding-right" : '3rem',
        "padding-left" : '3rem',
    },
    board_background : {
        "background-image" : `url(${board})`
    }

})

const dietary_requirements = ["Vegan", "Vegetarian", "None"];

class CreateMealTemplate extends Component {

    constructor(props){
        
        super(props);
        redirectIfNotLoggedIn();
        this.state = {
            values : {
                title : "",
                description: "",
                
                date : new Date().toLocaleDateString("en-US"),
                time : formatTimeNoSecs(new Date().toLocaleTimeString()),
                proposed_meal : "",
                expected_contribution : 0.0,
                guest_limit : 1,
                address_1 : "",
                city : "",
                post_code : "",
            },
            optional : {
                imagePreviewUrl: "",
                suggested_theme : "",
                dietary : "",
                age_range : [],
            },
            //visibility for extra fields
            visibility : {
                suggested_theme_vis : false,
                dietary_vis : false,
                age_range_vis : false,
                own_address_vis : true,
            },
            //errors
            formErrors: {
                title : "",
                description: "",
                date : "",
                time : "",
                proposed_meal : "",
                expected_contribution : "",
                guest_limit : "",
                address_1 : "",
                city : "",
                post_code : ""
            }
        }
        //ajax call to get the user address and set the values to it
        //debug
        let own_address = this.getOwnAddressAjax();
        this.address_1_own = own_address[0];
        this.city_own = own_address[1];
        this.post_code_own = own_address[2];
        //might use the setState which is a lazy f, i think works better with async ajax
        this.state.values.address_1 = this.address_1_own;
        this.state.values.city = this.city_own;
        this.state.values.post_code = this.post_code_own;
        console.log(this.state.values);
        console.log(this.address_1_own);
        this.onChange = this.onChange.bind(this);
        this.onChangeHandleNumber = this.onChangeHandleNumber.bind(this);
        this.onChangeOptional = this.onChangeOptional.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.debugFillFields = this.debugFillFields.bind(this);
        this.handleVis = this.handleVis.bind(this);
        this.handleSlider = this.handleSlider.bind(this);
        this.handleSwitchAddress = this.handleSwitchAddress.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    optional_inputs = ["dietary", "suggested_theme"];
    
    getOwnAddressAjax(){
        //return address1, city, post code
	let fromS;
	$.ajax({ url: 'PHPF/getaddress.php',
            type: 'post',
	    async:false,
            data: {"username" :getCookie("Username")},
            error : function(){
                //fucntion called in case the ajax didnt work. Will harcode data for tests and localhost
                fromS = JSON.parse('{"city":"Glasgow","postcode":"G1 3RB","addressOne":"27 Union St"}');
            },
            success: function(output) {
                fromS = JSON.parse(output); 
            }
        });
        return [fromS["addressOne"], fromS["city"], fromS["postcode"]];
    }
    handleSlider(e, value){
        this.setState({...this.state, optional : { ...this.state.optional, age_range : value}}); //this will update for everytick. It can be laggy. Might consider to not use an handler and just get data after form is set up
    }

    handleDate(date_){ //date is handled differently (not like an event)
    

	var str = date_.toString();
        console.log("handle data");
        //console.log(this.state.values.date + "state");
	var test = new Date(str).
	  toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).
	  replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
      this.setState({...this.state, values : { ...this.state.values, date : test}});

      let formErrors = this.state.formErrors;
    formErrors.date = 
        date_.getDate < new Date()
        ? "dob can't be in the past"
        : "";
        this.setState({formErrors, dob : date_}, () => console.log(this.state));
    }

    onChangeHandleNumber(event){
        console.log(event.target.value);
        if(event.target.name == 'guest_limit' && event.target.value > 0){
            this.onChange(event)
        }
        else if(event.target.name == 'expected_contribution' && event.target.value >= 0.0){
            this.onChange(event)
        }

    }
    onChange(event){//every time an element is modified from the user this function is called. So it is possible to perform checks for each keystroke if needed
        event.preventDefault();
        const {name, value} = event.target;
        let formErrors = this.state.formErrors;

        console.log("on change");
        console.log(event.target.value);
        this.setState({...this.state, values : { ...this.state.values, [event.target.name] : event.target.value}}); //https://stackoverflow.com/questions/34072009/update-nested-object-with-es6-computed-property-name

        switch(name) {
            case 'title' : 
                formErrors.title = 
                    value.length < 3
                    ? "minimum 3 characters required"
                    : "";
                break;

            case 'description':
                formErrors.description = 
                    value.length < 5
                    ? "minimum 5 characters required"
                    : "";
                break;
            
            //date handled in handleDate()

            //not sure about the time check atm
            
            case 'proposed_meal' : 
                formErrors.proposed_meal = 
                    value.length < 3
                    ? "minimum 3 characters required"
                    : "";
                break;
            
            case 'expected_contribution' : 
                formErrors.expected_contribution = 
                    value.length > 6
                    ? "your contribution offer is too high"
                    : "";
                break;
            
            case 'guest_limit' : 
                formErrors.guest_limit = 
                    value > 20
                    ? "too high a guest limit"
                    : "";
                break;
            
            case 'address_1' : 
                formErrors.address_1 = 
                    value.length < 5
                    ? "minimum 5 characters required"
                    : "";
                break;
            
            case 'city' : 
                formErrors.city = 
                    value.length < 3
                    ? "minimum 3 characters required"
                    : "";
                break;
            
            case 'post_code':
            formErrors.post_code = 
                postcodeRegex.test(value)
                ? ""
                : "postcode should be a uk postcode";
                break;

            default:
            break;
        }
    }

    onChangeOptional(event){
        console.log("on change optional");
        console.log(event.target.name + " " + event.target.value);
        this.setState({...this.state, optional : { ...this.state.optional, [event.target.name] : event.target.value}});
    }

    handleVis(event){
        //remove vis part to get the name of the field and clear it
        var name = event.target.value;
        var index = name.lastIndexOf("_");
        var stateName = name.slice(0,index);
        console.log(event.target.value +  " " + event.target.checked);
        this.setState({...this.state, visibility : {...this.state.visibility, [event.target.value] : event.target.checked }});
        //this.setState({...this.state, values : {...this.state.values, [stateName] : ""}}); //TODO: PUT THIS IN THE OTHER SET STATE
        console.log(this.state.visibility);
    }

    handleSwitchAddress(event){
        var name = event.target.value;
        var index = name.lastIndexOf("_");
        var stateName = name.slice(0,index);
        console.log(event.target.value +  " " + event.target.checked);
        var s = {...this.state};
        s.visibility[event.target.value] = event.target.checked
        if(event.target.checked){
            s.values.address_1 = this.address_1_own;
            s.values.city = this.city_own;
            s.values.post_code = this.post_code_own;
        }
        this.setState({s}, () => console.log(this.state));
        //this.setState({...this.state, visibility : {...this.state.visibility, [event.target.value] : event.target.checked }});
    }

    handleImageChange = event => {
        event.preventDefault();
      let reader = new FileReader();
      let file = event.target.files[0];
      console.log("Image should be added"); 
        reader.onloadend = () => {
        
        //file: file,
        this.setState({...this.state, optional : { ...this.state.optional, imagePreviewUrl: reader.result}});
        

        }

       if (event.target.files[0]) {reader.readAsDataURL(file);}

    };

    onSubmit(event) {
        console.log("on submit");
        
        //add to this fucntion the connection to the DB. can retreive all the inputs values from 'this.state'. care: they are stored all as strings at the moment (JS dynamic types)
        const {title, description, city} = this.state.values;
        var objmerged = {...this.state.values, ...this.state.optional}; //have to merge the optional and not optional object together
        //add secs to time
        objmerged.time = objmerged.time + ":00";

        for(var k in objmerged){
            if(typeof(objmerged[k]) != "string")
                objmerged[k] = JSON.stringify(objmerged[k]);
            
        }
        console.log(objmerged)
        
        
        console.log("state ");
        console.log(this.state);
        event.preventDefault();
	console.log("state mereg");
	console.log(objmerged);
	 $.ajax({ url: 'PHPF/createmeal.php',
            type: 'post',
            data: {"data" : objmerged},
            success: function(output) {
                if(output == "DONE"){
                    window.location.href = "/map"; //change to map page
                }
                else{
                    alert("Sorry, an unknown error occured.");
		    alert(output);
                }
            }
        });

    }

    //DEBUG ONLY

    debugFillFields() {
        console.log("debug full fields");
        var v = {...this.state.values}; //create dummy object and then replace all the properties. After, replace the state object with the updated one
        v.title = "new Meal"; v.description = "this is an informal meal to get to know new people and have some fun"; v.city = "Edinburgh";
        v.dietary = "none"; v.date = new Date().toDateString(); v.proposed_meal = "make your own favorite pizza"; v.expected_contribution = "4.5"; v.guest_limit = "4";
        v.imagePreviewUrl = meal;
        v.age_range= "none"; 
        v.suggested_theme = "none";
        this.setState({values : v});        
    }

    render() {
        const {classes} = this.props;
        const { formErrors } = this.state;
        //console.log(this.state.values.imagePreviewUrl)
        //meal picture stuff
        let {imagePreviewUrl} = this.state.optional;
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
                        <img src={meal} id="uploadme" height="100%" width="100%" className= {myStyle.image} style={{
                            contentFit:'contain',border: "1px solid #ddd", borderRadius: "15px", 
                            }} 
                        />
                    </div>
                )

            var un = getCookie("Username");
            console.log(un);
            if(!isUserLoggedIn()) {
                window.location.href = "/";
                return null;
            }
        //console.log(this.optional);
        }
        var submitDisabled = false;
        var values = Object.values(this.state.values);
        var errors = Object.values(this.state.formErrors)
        console.log(values);
        for(var v of values){
            if(v.length == 0){
                submitDisabled = true;
                break;
            }
        }
        if(!submitDisabled){
            for(var v of errors){
                if(v.length != 0){
                    submitDisabled = true;
                    break;
                }
            }
        }

        return(
            <div className={classes.root} style={{height:'100%', width:'100%', posistion:'absolute'}}>
                <Grid container style={{width:"100%", height:"100%"}}>
                    <Grid item xs={12}>
                        <div className="main-body">
                            {/*<Button variant="contained" color="secondary" onClick={this.debugFillFields}>
                                Debug fill fields
                            </Button>*/}
                            Create a Meal Event
                        </div>
                    </Grid>

                    <Grid item container xs={10} style={{marginLeft:"13%", marginRight:"5%"}}>
                        <form onSubmit={this.onSubmit} style={{width:"66.6%"}}>
                        <Paper style={{"background-image" : `url(${board})`, padding:'1%'}}>
                            <Grid item container xs={12}>            
                                <Grid item container xs={6} >
                                    <Grid item xs={12}>
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
                                                        onChange={this.handleImageChange}  
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>

                                <Grid item container xs={6}>
                                    <Grid item xs={12} >
                                        {/* id: <name_id>_cm; cm stands for create meal */}
                                        <TextField name="title" id="title_cm" error= {formErrors.title} helperText= {formErrors.title}
                                        onChange={this.onChange} value={this.state.values.title} type="text" 
                                        label="Title" style={{marginRight:"2%"}}/>
                                    </Grid>
                                    <p />
                                    <Grid item xs={12} style={{"margin-top" : "3%"}}>
                                        <TextField multiline error= {formErrors.description} helperText= {formErrors.description} name="description" id="description_cm" onChange={this.onChange} value={this.state.values.description} type="text"
                                        label="Description" variant="outlined" style={{marginRight:"2%"}}/>
                                    </Grid>
                                    <Grid item container xs={12}>
                                        <Grid item xs={12}>
                                            <FormLabel style={{marginRight:"2%"}}>Location</FormLabel>
                                        </Grid>
                                        <Grid item container xs={12}>
                                            <FormGroup style={{marginRight:"2%", marginLeft:"25%"}}>
                                                <Grid item container xs={12}>
                                                    <FormControlLabel control={
                                                        <Grid item xs={4}>
                                                            <Switch value="own_address_vis" checked={this.state.visibility.own_address_vis} onClick={this.handleSwitchAddress}
                                                            />
                                                        </Grid>
                                                    } label={
                                                        <Grid item xs={8}>
                                                            At the stored address
                                                        </Grid>
                                                        } />
                                                </Grid>
                                            </FormGroup>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker error= {formErrors.date} helperText= {formErrors.date}
                                            name="date" id="date_cm" margin="normal" clearable autoOk={true} disableOpenOnEnter variant="inline" label="Date picker" format="dd/MM/yyyy"
                                            value={this.state.values.date} onChange={this.handleDate} />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField name="time" id="time_cm" onChange={this.onChange} value={this.state.values.time} type="time" label="Time"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField error= {formErrors.proposed_meal} helperText= {formErrors.proposed_meal} name="proposed_meal" id="proposed_meal_cm" onChange={this.onChange} value={this.state.values.proposed_meal} type="text" label="Proposed meal" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField error= {formErrors.expected_contribution} helperText= {formErrors.expected_contribution} name="expected_contribution" id="expected_contribution_cm" onChange={this.onChangeHandleNumber} value={this.state.values.expected_contribution} type="number" label="Expected contribution" 
                                        InputProps={{startAdornment: <InputAdornment position="start">£</InputAdornment>}}/>
                                    </Grid>
                                    <Grid item xs={12}>                                        
                                        <TextField error= {formErrors.guest_limit} helperText= {formErrors.guest_limit} name="guest_limit" id="gues_limit_cm" onChange={this.onChangeHandleNumber} value={this.state.values.guest_limit} type="number" label="Guest Limit" />                                        
                                    </Grid>
                                    <Grid item xs={12}>
                                        {this.state.visibility.suggested_theme_vis &&
                                        <TextField name="suggested_theme" id="suggested_theme_cm" onChange={this.onChangeOptional} value={this.state.optional.suggested_theme} type="text" label="Suggested Theme" />
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        {this.state.visibility.dietary_vis &&
                                        <Select name="dietary" id="dietary_cm" onChange={this.onChangeOptional} value={this.state.optional.dietary} displayEmpty>
                                            <MenuItem value="" disabled>Dietary Requirements</MenuItem>
                                            {dietary_requirements.map((v)=><MenuItem value={v}>{v}</MenuItem>)}
                                        </Select>
                                        } {/*at the moment is a text box. Once DB connection is set up, should retreive multiple choices from DB and use a <select />*/}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {this.state.visibility.age_range_vis &&
                                        <div style={{"margin" : 10}}>
                                            <Typography className={classes.age_range} variant="caption" display="block" align="left" >Age range</Typography>
                                            <Slider onChangeCommitted={this.handleSlider} defaultValue={[0,99]} min={0} max={99} valueLabelDisplay="auto" aria-labelledby="range-slider" />
                                        </div>
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" startIcon={<AddIcon />} type="submit" disabled={submitDisabled}>
                                            Create
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid> 
                        </Paper>
                        </form>
                                

                        <Grid item container xs={3} style={{marginLeft:"2%"}}>
                            <Grid item container xs={12}>                            
                                <Paper className={`${classes.padded} ${classes.board_background}`}>
                                    <Grid item>
                                        <Typography variant="h6">Profile Address stored</Typography>
                                        <br/>
                                    </Grid>
                                    <Grid item>
                                        <TextField name="address_1" id="address_1_cm" onChange={this.onChange} value={this.state.values.address_1} 
                                        type="text" label="Address 1" disabled={this.state.visibility.own_address_vis} />
                                    </Grid>
                                    <Grid item>
                                        <TextField name="city" id="city_cm" onChange={this.onChange} value={this.state.values.city}
                                        type="text" label="City" disabled={this.state.visibility.own_address_vis} />
                                    </Grid>
                                    <Grid item>
                                        <TextField name="post_code" id="post_code_cm" onChange={this.onChange} value={this.state.values.post_code}
                                    type="text" label="Post Code" disabled={this.state.visibility.own_address_vis} />
                                    </Grid>
                                </Paper> 
                            </Grid>
                            
                            <Grid item container xs={12} style={{marginTop:"4%"}}>
                                <Paper className={`${classes.padded} ${classes.board_background}`}>
                                    <FormControl>
                                        <FormLabel>Extra fields</FormLabel>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox value="suggested_theme_vis" checked={this.state.visibility.suggested_theme_vis} onClick={this.handleVis}></Checkbox>} label="Suggested Theme"></FormControlLabel>
                                            <FormControlLabel control={<Checkbox value="dietary_vis" checked={this.state.visibility.dietary_vis} onClick={this.handleVis}></Checkbox>} label="Dietary requirements"></FormControlLabel>
                                            <FormControlLabel control={<Checkbox value="age_range_vis" checked={this.state.visibility.age_range_vis} onClick={this.handleVis}></Checkbox>} label="Age range"></FormControlLabel>
                                        </FormGroup>
                                    </FormControl>
                                </Paper>
                            </Grid>
                        </Grid>
                        {/* </Paper> */}
                               
                        
                    </Grid>

                </Grid>
            </div>
            
        );
    }
}


CreateMealTemplate.propTypes = {
    classes : PropTypes.object.isRequired,
};
export default withStyles(styles)(CreateMealTemplate);



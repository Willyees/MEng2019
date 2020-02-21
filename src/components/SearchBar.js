import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import {MuiPickersUtilsProvider, KeyboardDatePicker, DatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import $ from 'jquery';

const styles = ({
    root:{
        display: 'flex',
        
    },
    paper:{
        display: 'flex',
        alignItems: 'center',
        marginLeft:5,
        marginRight:5,
    },
    iconSearch:{
        padding:10,
    },
    submitButton:{
        margin:10,
    },
    filtersA :{
        'text-decoration': 'inherit',
        display:'flex',
        alignItems:'center',
        color:'blue'
    },
    innerElem :{
        margin : 5,
    }


})


class SearchBar extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            values : {//if using different types than "" and null, have to modify submit fucntion if statememnt
                title : "",
                city : "",
                date : null,
                time : [],
                dietary : "",
            },
            vis : {
               filter_vis : false, 
            },
            formErrors : {
                city : "",
                date : "",
            }
        }
        this.dietary = [];
        this.time = {
            "Breakfast" : ["07:00:00","11:00:00"],
            "Lunch" : ["12:00:00", "17:00:00"],
            "Dinner" : ["18:00:00","22:00:00"],
            "Night" : ["23:00:00", "07:00:00"]
        };

        this.getDietReqDb();
        this.handleClickFilter = this.handleClickFilter.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleErrorDate = this.handleErrorDate.bind(this);
    }
    
    //debug method because cant use a ajax locally
    handleResponseAjax(data){
        console.log(this);//used to check why server version is not finding the fucntion handlerfiltered
        console.log(data);
        this.props.handlerFiltered(data);
    }
    ajaxCallFilter(obj){
        if(window.location.host == "localhost:3000"){
            //fetch wont work because missing CORS from php header. will hardcode data for quick debug purposes
            //fetch('http://3.94.4.155/PHPF/filter.php', {mode : 'no-cors'}).then((response) => {return response.json();}).then((a) =>{console.log(a);});
            var data = '["104", "101"]';
            this.handleResponseAjax(data);
            var f = this;
            console.log(f);
        } else{
            var f = this;
            $.ajax({ url: 'PHPF/filter.php',
            type: 'post',
            data: {"data" : obj},
            success: function(output) {
                f.props.handlerFiltered(output);
            }
            });
        }
    }

    getDietReqDb(){
        //ajax call to db to get the available dietary requirements. Or just hardcode them here
        this.dietary = ['Vegetarian','Vegan'];
    }
    //user is not forced to fill all the fields, can search using any of the fields. The only one needed is city
    //might be useful to Oscar when querying the DB
    getListFieldsSearch(){
        var v = [];
        for( var key of Object.keys(this.state.values)){
            if(this.state.values[key] != null){
                var value = this.state.values[key];
                v.push({[key] : value});
            }
        }
        return v;
    }

    //used to return the values of the this.time that will be passed to the DB
    //time is passed as multiple array. Each is a time frame=> time :{[t1,t2],[t1,t2]}
    getTimeArrayRange(strRange){
        var numRange = [];
        console.log(this.state.values.time);
        console.log(strRange);
        numRange.push([this.time[strRange]]);
        console.log(numRange);
        return numRange;
    }

    //at least the city must be specified, otherwise error shown
    handleSearch(event){
        //check no errors in the form
        if(this.state.values.city == ""){
            this.setState({...this.state, formErrors : { ...this.state.formErrors, city : "city must be chosen"}});
            
            return;
        }
        if(this.state.formErrors.date != ""){
            console.log("error in date format");
            return;
        }
        //ajax call with this.state.values wiht only the non empty ones
        let obj = {}
        //console.log(this.time[this.state.values.time]);
        for(let v in this.state.values){
            if(this.state.values[v] != "" && this.state.values[v] != null && this.state.values[v] != []){
                if(v=="time"){
                    obj[v] = this.getTimeArrayRange(this.state.values[v]); 
                }
                else{
                    obj[v] = this.state.values[v];
                }
            }
        }
        console.log(obj)
    this.ajaxCallFilter(obj);
    }

    handleOnChange(event){
        if(event.target.name == "city"){
            var error_text = "";
            if(event.target.value.length == 0){
                error_text = "city must be chosen";
            }
            this.setState({...this.state, formErrors : { ...this.state.formErrors, city : error_text}, values : {...this.state.values, city : event.target.value }});

        }
        else{
            if(event.target.value == "none")
                event.target.value = "";
            this.setState({...this.state, values : { ...this.state.values, [event.target.name] : event.target.value}});
        }
    }

    handleDate(date_){ //date is handled differently (not like an event)
        console.log(date_);
        if(!date_) //checking date is not empty string or null
            if(date_ == null){//in case is null (was set by the clearing button on the calendar, set the state without any modification on date_)
                console.log("null date");
                console.log(date_)
                this.setState({...this.state, values : { ...this.state.values, date : date_}});
                return;
            }
            else
                return;
        var str = date_.toString();
            console.log("handle data");
            //console.log(this.state.values.date + "state");
        var d = new Date(str).
          toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).
          replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
          console.log(d);
          this.setState({...this.state, values : { ...this.state.values, date : d}});
    }

    handleErrorDate(e,v){
        console.log("Handle date error");
        console.log(e);
        console.log(v);
        this.setState({...this.state, formErrors : { ...this.state.formErrors, date : e}});//setting error if any happened. In case no error, it will set ""

    }

    handleClickFilter(e){
        console.log("handle click filter");
        this.setState((state) => ({filter_vis : !state.filter_vis}) );
        console.log(this.state.filter_vis);
	
    }
    render(){
        const {classes} = this.props;
    return(
    <div>
        <div className={classes.root}>
            <Paper className={classes.paper} >
                {/*<IconButton className={classes.iconButton} id="search_btn" type="submit"/ > */} <SearchIcon className={classes.iconSearch}/>
                <TextField className={classes.innerElem} id="search-bar-title" name="title" placeholder="Title keywords" type="search" value={this.state.values.title} onChange={this.handleOnChange}></TextField>  
            </Paper>
            <Paper className={classes.paper} >
                <LocationOnIcon className={classes.iconSearch} />
                <TextField className={classes.innerElem} error={this.state.formErrors.city} helperText={this.state.formErrors.city} id="search-bar-city" name="city" placeholder="City" type="search" value={this.state.values.city} onChange={this.handleOnChange}></TextField>  
            </Paper>
            <Button id="search-button" className={classes.submitButton} variant="contained" color="primary" onClick={this.handleSearch}>
                SEARCH
            </Button>
            <Typography className={classes.filtersA} variant="subtitle1"><a className={classes.filtersA} href="#" onClick={this.handleClickFilter}>More filters</a></Typography>
        </div>
        {this.state.filter_vis &&
        <div className={classes.root}>
            {/*second row: show date, time, dietary requirements + filter button*/}
            <Paper className={classes.paper}>
            <MuiPickersUtilsProvider className={classes.innerElem} utils={DateFnsUtils}>
                <KeyboardDatePicker className={classes.innerElem} name="date" margin="normal" clearable={true} autoOk={true} variant="dialog" format="dd/MM/yyyy"
                value={this.state.values.date} onError={this.handleErrorDate} onChange={this.handleDate} emptyLabel="Pick Date"/>
            </MuiPickersUtilsProvider>
            </Paper>
            <Paper className={classes.paper}>
            <Select className={classes.innerElem} displayEmpty value={this.state.values.time} name="time" 
            onChange={this.handleOnChange} renderValue={
                selected => {if(selected == ""){
                    return "Time frame";
                }
                return selected;}
            }>
                <MenuItem value={[]} disabled>Time frame</MenuItem>
                {Object.keys(this.time).map((v,k) => 
                <MenuItem value={v} key={k}>
                    {/*<Checkbox checked={this.state.values.time.indexOf(v) + 1} />{v}*/}
                    {v} 
                </MenuItem>)}
                <MenuItem value="none">None</MenuItem>
            </Select>
            </Paper>
            <Paper className={classes.paper}>
                <Select className={classes.innerElem} displayEmpty value={this.state.values.dietary} name="dietary" onChange={this.handleOnChange}>
                    <MenuItem value="" disabled>Dietary Type</MenuItem>                    
                    {this.dietary.map((v, k) => <MenuItem value={v} key={k}>{v}</MenuItem>)}
                    <MenuItem value="none">None</MenuItem>
                </Select>
            </Paper>

            {/*<Button id="filter-button" className={classes.submitButton} variant="contained" color="primary">FILTER</Button> need filter button? */}
        </div>}
    </div>
    )}
};

SearchBar.propTypes = {
    classes : PropTypes.object.isRequired,
};
export default withStyles(styles)(SearchBar);

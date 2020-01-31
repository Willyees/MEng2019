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


})

class SearchBar extends Component {
    constructor(prop){
        super(prop);
        
        this.state = {
            values : {
                title : null,
                city : null,
                date : null,
                time : null,
        },
            vis : {
               filter_vis : false, 
            }
        }

        this.handleClickFilter = this.handleClickFilter.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    //user is not forced to fill all the fields, can search using any of the fields. The only one needed is city
    //might be useful to Oscar when querying the DB
    getListFieldsSearch(){
        var v = [];
        for( var key of Object.keys(this.state.values)){
            console.log(this.state.values[key]);
            if(this.state.values[key] != null){
                var value = this.state.values[key];
                console.log(key + " " + value);
                v.push({[key] : value});
            }
        } 
        console.log(v);
        return v;
    }

    handleOnChange(event){
        this.setState({...this.state, values : { ...this.state.values, [event.target.name] : event.target.value}});
        this.getListFieldsSearch();
    }

    handleDate(date_){ //date is handled differently (not like an event)
        var str = date_.toString();
            console.log("handle data");
            //console.log(this.state.values.date + "state");
        var d = new Date(str).
          toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).
          replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
          console.log(d);
          this.setState({...this.state, values : { ...this.state.values, date : d}});
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
                <TextField id="search-bar" name="title" placeholder="Title keywords" type="search" value={this.state.title} onChange={this.handleOnChange}></TextField>  
            </Paper>
            <Paper className={classes.paper} >
                <LocationOnIcon className={classes.iconSearch} />
                <TextField id="search-bar" name="city   " placeholder="City" type="search" value={this.state.city} onChange={this.handleOnChange}></TextField>  
            </Paper>
            <Button id="search-button" className={classes.submitButton} variant="contained" color="primary" >
                SEARCH
            </Button>
            <Typography className={classes.filtersA} variant="subtitle1"><a className={classes.filtersA} href="#" onClick={this.handleClickFilter}>More filters</a></Typography>
        </div>
        {this.state.filter_vis &&
        <div className={classes.root}>
            {/*second row: show date, time, dietary requirements + filter button*/}
            <Paper className={classes.paper}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker name="date" margin="normal" clearable autoOk={true} variant="inline" format="dd/MM/yyyy"
                value={this.state.date} onChange={this.handleDate} />
            </MuiPickersUtilsProvider>
            </Paper>
            <Paper className={classes.paper}>
            <TextField name="time" id="time_cm" type="time" label="Time" value={this.state.time}/>
            </Paper>
            <Paper className={classes.paper}>

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
import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles({
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

function SearchBar() {
    const classes = useStyles();
    return(
    <div>
        <div className={classes.root}>
            <Paper className={classes.paper} >
                {/*<IconButton className={classes.iconButton} id="search_btn" type="submit"/ > */} <SearchIcon className={classes.iconSearch}/>
                <TextField id="search-bar" name="search_bar" placeholder="Title keywords" type="search"></TextField>  
            </Paper>
            <Paper className={classes.paper} >
                <LocationOnIcon className={classes.iconSearch} />
                <TextField id="search-bar" name="search_bar" placeholder="City" type="search"></TextField>  
            </Paper>
            <Button id="search-button" className={classes.submitButton} variant="contained" color="primary" >
                SEARCH
            </Button>
            <Typography className={classes.filtersA} variant="subtitle1"><a className={classes.filtersA} href="#">More filters</a></Typography>
        </div>
        <div>
            {/*second row: show date, time, dietary requirements + filter button*/}
        </div>
    </div>
    )
};
export default SearchBar;
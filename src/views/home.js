import React, {Component} from 'react';
import AppBar from '../components/AppBar';
import $ from 'jquery';
import { element } from 'prop-types';
import {isUserLoggedIn, getCookie} from '../helperFunctions'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import img_map from '../res/map_meal_time.png'
import { Typography } from '@material-ui/core';

import MapWrapper from '../components/MapWrapper'
import  {MapTemplateMulti ,getMeals} from './map'

class HomeTemplate extends Component {
    
    constructor(props){
        super(props);
    }

    componentDidMount() {
        //if dont want to see the page flashing before redirecting, have to check user logged in inside the render method (is called before than componentDidMount)
        var un = getCookie("temp");
        if(isUserLoggedIn()){
             //User is logged in, could be of some use
        }
    }

    render() {
	//Wrapped in div as return must return a single element, div means we can add more childre 
        return(
	    <div>
            <div>
                <AppBar/>
            </div>
                <Grid container className="main-body" alignItems="center" justify="center">
                <Grid item xs={6}>
                    <Paper className="paper-board">
                        <Typography variant={'h5'} color={"textPrimary"}>
                        Meal Time is a place where people can organise their meals and share information. <p />
                        Our goal is to create a platform that would enable people to cook together and to socialize, may be learning new recipes!
                        </Typography>
                    </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <MapTemplateMulti mapWidth={100} sliderVisib={false} filterVisib={false} boxesVisib={false}/>
                    </Grid>

                    
                    <Grid item xs={12}>
                        
                        <Typography variant={'h6'}>
                        <br/>
                        To be able to interact, you have to create a profile
                        </Typography>   
                    </Grid>
                    
                </Grid>

	    </div>
        );
    }
}

export default HomeTemplate;

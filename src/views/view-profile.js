import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../components/AppBar.js';
import ViewProfileGrid from '../components/GridViewProfile.js';
import {isUserLoggedIn, getCookie, redirectIfNotLoggedIn} from '../helperFunctions';

const styles = makeStyles(theme => ({
    root:{
        display: "flex",
        justifyContent: "space-between",
    },
    
}));

const useStyles = makeStyles(styles);



class ProfileViewTemplate extends Component {
    constructor(props){
        super(props);
        redirectIfNotLoggedIn();
    }

    render() {
	if(!isUserLoggedIn()){
	    document.locaction = "/log-in";
	}
        return(
            <div>
                <AppBar>
                </AppBar>
                    <ViewProfileGrid>
                    </ViewProfileGrid>
            </div>
        );
    }
}

export default ProfileViewTemplate;

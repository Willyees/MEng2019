import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../components/AppBar.js';
import ProfileGrid from '../components/GridProfile.js';
import {fromServer} from '../components/GridProfile.js';
import $ from 'jquery';


const styles = makeStyles(theme => ({
    root:{
        display: "flex",
        justifyContent: "space-between",
    },
    // grid:{
    //     marginRight: "-15px",
    //     marginLeft: "-15px",
    //     width: "auto"
    // }
    
}));

const useStyles = makeStyles(styles);
var copyInitial;

class ProfileTemplate extends Component {
    constructor(props){
        super(props);
    }
	
    componentDidMount() {
	//Copy initial data to see what is changed
	copyInitial = fromServer;
    }

    onSubmit = event => {
	event.preventDefault(); //stop page reload
	//Loop through fromServer array, see if anything has changed
	$.each(fromServer, function(key, valueObj){
	    if(valueObj != copyInitial[key]){ //Done use !==
		alert("changed");
		//Something has changed at it needs updating
		//IMPORTANT: This working relies on the ID's of the textfields in GridProfile
		//Been the same as the database ids kinda confusing
	    }
	});
        	
    };

    render() {
        return(
            <div>
                <AppBar>
                </AppBar>
                <form onSubmit={this.onSubmit}>
                    <ProfileGrid>
                    </ProfileGrid>
                </form>
                

                

                {/* <div style={{width: '100%', margin:  'auto'}}>
                    <Paper
                        padding= "22"
                    >
                        hey
                        <Image
                            src= {profile}
                        >
                        </Image>

                        <div>
                            <TextField multiline name="bio" id="bio-mltb" type="text"
                            label="Your bio" variant="outlined"/>
                        </div>
                    </Paper>
                    <div>
                        <Paper>
                            <GridList>
                                <GridListTile>
                                    hey2
                                </GridListTile>
                                <GridListTile>
                                    hey3
                                </GridListTile>

                            </GridList>   
                        </Paper>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default ProfileTemplate;

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
	   // copyInitial = fromServer;
	    copyInitial = Object.assign({}, fromServer);
    }

    onSubmit = event => {
	event.preventDefault(); //stop page reload
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

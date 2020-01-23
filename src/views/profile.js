import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../components/AppBar.js';
import Grid from '../components/Grid.js';


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

class ProfileTemplate extends Component {
    constructor(props){
        super(props);
    }

    

    render() {
        return(
            <div>
                <AppBar>
                </AppBar>
                <Grid>
                </Grid>

                

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

import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../components/AppBar.js';
import Grid from '../components/ShowMealGrid.js';
import ShowMealGrid from '../components/ShowMealGrid.js';

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

class ShowMealTemplate extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>     
                <AppBar>
                </AppBar>
                <ShowMealGrid>
                </ShowMealGrid>
            </div>
        );
    }
}

export default ShowMealTemplate;

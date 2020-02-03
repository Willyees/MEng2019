import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../components/AppBar.js';
import MessagesGrid from '../components/GridMessages.js';


const styles = makeStyles(theme => ({
    root:{
        display: "flex",
        justifyContent: "space-between",
    },
    
}));

const useStyles = makeStyles(styles);

class messagesTemplate extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return(
            <div>
                <AppBar>
                </AppBar>
                <MessagesGrid>
                </MessagesGrid>
            </div>
        );
    }
}

export default messagesTemplate;

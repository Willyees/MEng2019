import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ChatList from './ChatList.js';
import RecentPeopleList from './RecentPeopleList.js';
import ChatSettingsList from './ChatSettingsList.js';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        
    },
    pagePaper:{
        padding: theme.spacing(1),
        width: '139%',
        marginLeft: "-20%",
        marginTop: '-25%', 
    },
}));



export default function MessagesGrid() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.pagePaper}>
                <Grid container>    
                    {/* menu of recent people in the first quarter of the page*/}
                    <Grid item container xs={3}>
                        <Grid item container xs={12}>         
                            <RecentPeopleList />     
                        </Grid>
                    </Grid>

                    
                    {/* chat window to display current chat with person or group*/}
                    <Grid item container xs={6} style={{justifyContent: "left",}}>
                        <Grid item container xs={12}>
                            <ChatList />
                        </Grid>
                        <Grid item contatiner xs={12}>
                            <TextField
                                multiline rows={1} rowsMax={5} label= "Aa" variant="outlined" fullWidth
                            />
                        </Grid>
                    </Grid>

                    {/* specifec chat settings */} 
                    <Grid item container xs={3}>           
                        <Grid item container xs={12}>
                            <ChatSettingsList />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper> 
        </div>
    );
}
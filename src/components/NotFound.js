import React from 'react'
import notFoundImg1 from '../res/cowboybepop_empty.gif'
import notFoundImg2 from '../res/garfield_empty.gif'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const imgs = [notFoundImg1, notFoundImg2]

export default function NotFound(props){
    const img = imgs[Math.floor(Math.random() * imgs.length)];
    return(
    <div style={{
            'background': '#000',
            'position': 'fixed',
            'bottom': '0',
            'right': '0',
            'left': '0',
            "top": "0",
            "padding-top" : "64px"
          }}>
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h1">
                    404
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <img src={img} />
            </Grid>
                
                <Grid item xs={12} style={{"margin-top" : "2%"}}><Typography >So much emptyness.. We didn't find what you were looking for</Typography></Grid>
            
        
        </Grid>
    </div>
    )
}

import React, {Component} from 'react';
import {MealBox} from '../components/MealBox';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'


class ShowUserMealsTemplate extends Component {
    constructor(props){//expecting old-meals and new-meals
        super(props);

    }
    render(){
        console.log(this.props.oldmeals);
        console.log(this.props.newmeals);
        
        return(
        <div className="main-body">
            <Typography variant="h2">User's List of Meals</Typography>
            <Paper style={{"background-color" : "grey"}}>
                <Typography variant="h5">Past Meals</Typography>
            </Paper>
            <Grid container spacing={2}>
                {this.props.oldmeals.map(element => 
                <Grid  item xs={3} >
                    <MealBox title={element.title} img={element.img} date={element.date} id={element.id}></MealBox>
                </Grid>)}
            </Grid>
            <br/>
            <Paper style={{"background-color" : "green"}}>
                <Typography variant="h5">Upcoming Meals</Typography>
            </Paper>
            <Grid container spacing={2}>
                {this.props.newmeals.map(element => 
                <Grid item xs={3} >
                    <MealBox title={element.title} img={element.img} date={element.date} id={element.id}></MealBox>
                </Grid>)}
            </Grid>
            {/*<Grid container spacing={2}>
                <Grid item xs={3}><MealBox title="new title" img="bear1.png" date="03.03.2020" id="101" /></Grid>
                <Grid item xs={3}><MealBox title="new title" img="bear1.png" date="02.02.2020" /></Grid>
                <Grid item xs={3}><MealBox title="new title" img="bear1.png" date="02.02.2020" /></Grid>

        </Grid>*/}
            
        </div>  
        )
    }
}
export default ShowUserMealsTemplate;
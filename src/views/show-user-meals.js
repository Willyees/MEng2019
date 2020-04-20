import React, {Component} from 'react';
import {MealBox} from '../components/MealBox';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import {getCookie} from '../helperFunctions.js'


function getMealsUser(user){
    //add ajax call here
    //return data
}
class ShowUserMealsTemplate extends Component {
    constructor(props){//expecting meal with: title, host, date, image, id
        super(props);
        this.oldmeals = [];
        this.newmeals = [];
        this.hostmeals = [];
    }

    orderMeals(meals){
        var now = new Date();
        var curruser = getCookie("Username");
        console.log(now);
        meals.forEach((v) =>{
            if(curruser == v.host){
                this.hostmeals.push(v)
            }
            if(new Date(v.date) < now)
                this.oldmeals.push(v);
            else
                this.newmeals.push(v);
        })
    }
    render(){
        this.orderMeals(this.props.meals);//reorder everytime is rerendered. Take into account ajax call is asyncronous
        
        return(
        <div className="main-body">
            <Typography variant="h2">User's List of Meals</Typography>
            <Paper style={{"background-color" : "grey"}}>
                <Typography variant="h5">Past Meals</Typography>
            </Paper>
            <Grid container spacing={2} style={{margin : 5}}>
                {this.oldmeals.map(element => 
                <Grid  item xs={3} >
                    <MealBox title={element.title} img={element.img} date={element.date} id={element.id}></MealBox>
                </Grid>)}
            </Grid>
            <br/>
            <Paper style={{"background-color" : "green"}}>
                <Typography variant="h5">Upcoming Meals</Typography>
            </Paper>
            <Grid container spacing={2} style={{margin : 5}}>
                {this.newmeals.map(element => 
                <Grid item xs={3} >
                    <MealBox title={element.title} img={element.img} date={element.date} id={element.id}></MealBox>
                </Grid>)}
            </Grid>
            <Paper style={{"background-color" : "lightblue"}}>
                <Typography variant="h5">Your hosted meals</Typography>
            </Paper>
            <Grid container spacing = {2} style={{margin : 5}}>
                {this.hostmeals.map(element => 
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
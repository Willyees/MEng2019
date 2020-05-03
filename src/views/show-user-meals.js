import React, {Component} from 'react';
import {MealBox} from '../components/MealBox';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import {getCookie} from '../helperFunctions.js'
import $ from 'jquery';
import {redirectIfNotLoggedIn} from '../helperFunctions'


function getMealsUser(user){
    //add ajax call here
    //return data
}

class ShowUserMealsTemplate extends Component {
    constructor(props){
        super(props);
        redirectIfNotLoggedIn();
        this.state = {user : this.getCurrUser(), data : []}
        this.getMealsAjax();
    }

    getCurrUser(){
        return getCookie("Username")
    }

    getMealsAjax(){
        $.ajax({ url: 'PHPF/getmealsuser.php',
            type: 'post',
            data: {
                "username" : String(this.state.user),
                "limit" : String(this.props.limit)
            },
            success: function(output) {
                console.log(output);
                let d = []
                let d1 = JSON.parse(output);
                d1.forEach((entity)=> {
                    var parsed = JSON.parse(entity);
                    d.push(parsed)
                    console.log(parsed)
                })
                console.log(d)
                this.setState({data : d})
               
            }, 
            context : this
        });
    }

    render(){
        return(
        <div className="main-body">
            <Typography variant="h2">{this.state.user}'s List of Meals</Typography>
            <ShowUserMeals user={this.state.user} meals={this.state.data}/>
        </div>  
        
        )
    }
}
export default ShowUserMealsTemplate

export class ShowUserMeals extends Component {
    constructor(props){//expecting meal with: title, host, date, image, id
        super(props);
        this.oldmeals = [];
        this.newmeals = [];
        this.hostmeals = [];
    }

    orderMeals(meals){
        console.log(meals);
        var now = new Date();
        console.log(now);
        meals.forEach((v) =>{
            if(this.props.user == v.host){
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
            <div>
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
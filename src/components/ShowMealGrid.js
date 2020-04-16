import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridList from '../components/GridList.js';
import { blue } from '@material-ui/core/colors';
import {MuiPickersUtilsProvider, KeyboardDatePicker, DatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import 'date-fns'
import UserMealRequests from '../components/UserMealRequests.js';
import {isHost} from '../helperFunctions'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import mealPic from "../res/mealPic.jpg";
import board from "../res/chopping_board_chopped.png";
import calendar from "../res/calendar.png";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: theme.palette.primary,
    
  },
  paper: {
    padding: theme.spacing(8),
    color: theme.palette.secondary.main,
    marginLeft: "12%",
    marginRight: "12%",
    marginTop: "4.5%",
    width:'75%',
    "background-image" : `url(${board})`,
    "background-size" : `contain`,
  },
  CardTitle: {
    textAlign: "left",
  },
}));

const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: {
        main: '#f44336',
      },
    },
  });

function test(e, s){
  console.log(e);
  console.log("---------------")
  console.log(s)
}


export default function ShowMealGrid(props) {
  const classes = useStyles();
  const [ value, setValue] = React.useState(2);
  const [ hover, setHover] = React.useState(-1);
  console.log(props)
  //const [ date, setDate] = React.useState(props.date)
  return (
    
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Grid container spacing={2} xs={12} style={{marginTop:'3%'}}>
          <Paper className={classes.paper}>
            
            {/* title grid */}
            <Grid id="title_grid" container style={{justifyContent:"left", marginBottom:'3%'}}>
              <Grid item xs={10}>
                <Typography id="title" variant="h2" component="h2" gutterBottom>
                "Title"
                </Typography>
              </Grid>
              <Grid item xs={2}>
                { /*!isHost() && /*todo should also not be a partecipant - if so change text and disable button*/
                <Button variant="contained" color="secondary" startIcon={< AddCircleOutlineIcon/>} onClick={props.joinf}> JOIN </Button>
                }
              </Grid>
            </Grid>

            {/* meal picture and date/time/city grid*/}
            <Grid item container xs={12} maxHeight= "20%" maxWidth="30%" height="20%" width="30%">
              {/* meal picture */}
              <Grid item xs={6} maxHeight= "20%" maxWidth="30%" height="20%" width="30%" style={{justifyContent:"left", display: "flex"}} >
                  <img src={mealPic} height="100%" width="100%" style={{border: "1px solid #ddd", borderRadius: "15px"}}/>
              </Grid>
              {/* date/time/city grid */}
              <Grid item container xs={6}>
                {/* date grid */}
                <Grid id="date_grid" item xs={12}>
                  <Grid item container justify="center">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker value={props.date} name="date" margin="normal" clearable autoOk={true} disabled disableOpenOnEnter variant="static" label="Date picker" format="dd/MM/yyyy"
                          onChange={() =>{}}/>
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
                {/* time and city grid */}
                <Grid id="time_and_city_grid" container item xs={12} style={{justifyContent:"left"}}>
                  {/* time grid */}
                  <Grid id="time_grid" container item xs={12}>
                    {/* label for the time grid*/}
                    <Grid id="time_label_grid" item xs={5}>
                      <Typography id="time_label" variant="h4" component="h4" gutterBottom style={{justifyContent:"right"}}>
                        Time:
                      </Typography>
                    </Grid>
                    {/* actual time from db grid */}
                    <Grid id="get_time_grid" item xs={6}>
                      <Typography id="time" variant="h4" component="h4" gutterBottom style={{justifyContent:"left"}}>
                        "Time"
                      </Typography>
                    </Grid>
                    
                  </Grid>
                  {/* city grid */}
                  <Grid id="city_grid" container item xs={12}>
                    {/* city label grid */}
                    <Grid id="city_label_grid" item xs={5}>
                      <Typography id="city_label" variant="h4" component="h4" gutterBottom style={{justifyContent:"right"}}>
                        City :
                      </Typography>
                    </Grid>
                    {/* actual city from db grid */}
                    <Grid id="get_city_grid" item xs={6}>
                      <Typography id="city" variant="h4" component="h4" gutterBottom style={{justifyContent:"left"}}>
                        "City"
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

                  
            <Grid id="proposed_meal_and_theme_grid" item container xs={12} style={{marginTop:"2%", marginBottom:"2%"}}>
              <Grid id="proposed_meal_grid" container xs={6}>
                <Grid item container justifyContent="left">
                  <Typography id="proposed_meal_label" variant="h4" component="h4" >
                    Proposed meal:
                  </Typography>
                </Grid>
  
                <Grid id="get_proposed_meal" item xs={12} style={{"text-align" : "left"}}>
                  <Typography id="proposed_meal" variant="h4" component="h4" >a</Typography>
                </Grid>
              </Grid> 

              <Grid id="theme_grid" container xs={6}>
                <Grid item xs style={{justifyContent:"left"}}>
                  <Typography id="theme_label" variant="h4" component="h4">
                    Theme:
                  </Typography>
                  </Grid>

                <Grid item xs id="get_theme_grid">
                  <Typography id="theme" variant="h4" component="h4">
                    "Theme"
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
                  

            <Grid id="description_grid" container >
              <Grid item xs={12}>
                <Card variant="outlined" height="100%">
                  <CardContent>
                    <Typography id="description_title" gutterBottom style={{"justify-content": `center`, fontSize:'18', "text-decoration-line": `underline`}}>
                      Meal Description
                    </Typography>
                    <Typography id="description" variant="body2" component="p" style={{"justify-items": `left`, fontSize:'13'}}>
                      this is an informal meal to get to know new people that would like to be eaten
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <br/>
            <Grid id="guest_limit_grid" item container xs={6}>
              <Typography id="guest_limit_lb" variant="h4" component="h4">
                  Guest Limit:
              </Typography>
              <Typography id="guest_limit" variant="h4" component="h4"></Typography>
            </Grid>

            <Grid id="dietary_grid" item container xs={6}>
            <Typography id="dietary_lb" variant="h4" component="h4">
                Dietary Requirements:
            </Typography>
            <Typography id="dietary" variant="h4" component="h4">asd</Typography>
            </Grid>

            <Grid id="age_range_grid" item container xs={6}>
            <Typography id="age_range_lb" variant="h4" component="h4">
                Age Range:
            </Typography>
            <Typography id="age_range" variant="h4" component="h4"></Typography>
            </Grid>

            <Grid id="contribution_grid" item container xs={6}>
            <Typography id="contribution_lb" variant="h4" component="h4">
            Expected Contribution:
            </Typography>
            <Typography id="contribution_label" variant="h4" component="h4"></Typography>
            <Typography id="contribution"variant="h4" component="h4">£</Typography>
            </Grid>
          </Paper>
        </Grid>    
          <Button onClick={(e) => test(e, true)}>TEST</Button>

        <Grid container>
          <Paper className={classes.paper}>
            <Grid container item>
                <Typography variant="h2" component="h2" gutterBottom>
                  Participants
                </Typography>
            </Grid>
            <UserMealRequests data={props.participants} accept={false} />
          </Paper>
        </Grid>

        <Grid container xs={12}>
          <Paper className={classes.paper}>
            <Grid item container xs={12}>
              {/* review title grid */}
              <Grid id="review_title_grid" item container xs={10} style={{justifyContent:"left", marginBottom:'3%'}}>
                <Typography id="review_title" variant="h2" component="h2" gutterBottom>
                  Reviews
                </Typography>
              </Grid>
              {/* addItem button */}
              <Grid item container xs={2} style={{"justify-content":"flex-end"}}>
                <Button
                  size="big"
                  startIcon={< AddCircleOutlineIcon/>}
                  type="submit"
                  style={{contentFit:"contain", maxHeight:"50%", bottom:0}}
                >
                  Add review
                </Button>
              </Grid>
            </Grid> 

            <Grid id="review_list_grid" item container xs={12}>   
              <Card variant="outlined" height="100%">
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      R
                    </Avatar>
                  }
                  title="'Username'"
                  subheader="'Time and date when review posted'" style={{textAlign:"left"}}

                  action={
                    <Rating
                      name="read-only"
                      value={5}
                      //the 5 should be set to a variable "value" that will be read from db
                      precision={1}
                      readOnly
                    />
                  }
                />
                <CardContent>
                  <Typography variant="body2" component="p">
                    review comments. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                    dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Paper>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

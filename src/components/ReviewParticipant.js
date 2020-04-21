import React, {Component, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {isUserLoggedIn, getCookie} from '../helperFunctions';
import Link from '@material-ui/core/Link'
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import ExploreIcon from '@material-ui/icons/Explore';
import LogOutIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SaveIcon from '@material-ui/icons/Save';
import $ from 'jquery';
import bear from '../res/bear1.png';

import board from "../res/repeatable_chop_board.png";

const useStyles = makeStyles(theme => ({
    root: {
        flexgrow: 1,
        width: '100%', 
    },
    profilePaper: {
        padding: theme.spacing(10),
        // textAlign: 'center',
        color: theme.palette.text.secondary,
        
      },
  }));


const Form = () => {
    const [ownerState, setOwnerState] = useState({
        owner: '',
        description: '',
    });

    const handleOwnerChange = (e) => setOwnerState({
        ...ownerState,
        [e.target.name]: [e.target.value],
    });

    const blankCat = { name: '', age: '' };
    const [catState, setCatState] = useState([
        { ...blankCat },
    ]);

    const addCat = () => {
        setCatState([...catState, { ...blankCat }]);
    };

    const removeCat = () =>{
        setCatState(catState.splice(0, catState.length-1));
    };

    const handleCatChange = (e) => {
        const updatedCats = [...catState];
        updatedCats[e.target.dataset.idx][e.target.className] = e.target.value;
        setCatState(updatedCats);
    };

    return (
        <form>
            <div style={{marginTop:'4%'}}>
                {/* <label htmlFor="owner">Owner</label>
                <input
                    type="text"
                    name="owner"
                    id="owner"
                    value={ownerState.owner}
                    onChange={handleOwnerChange}
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    value={ownerState.description}
                    onChange={handleOwnerChange}
                /> */}
                <input
                    type="button"
                    value="Hello Bear"
                    onClick={addCat}
                />
                <input
                    type="button"
                    value="bye bear"
                    onClick={removeCat}
                />            
            </div>
            {
                catState.map((val, idx) => {
                    const catId = `name-${idx}`;
                    const ageId = `age-${idx}`;
                    return (
                        <div key={`cat-${idx}`}>
                            <label htmlFor={catId}>{`Bear #${idx + 1}`}</label>
                            {/* <input
                                type="text"
                                name={catId}
                                data-idx={idx}
                                id={catId}
                                className="name"
                                value={catState[idx].name}
                                onChange={handleCatChange}
                            />
                            <label htmlFor={ageId}>Age</label>
                            <input
                                type="text"
                                name={ageId}
                                data-idx={idx}
                                id={ageId}
                                className="age"
                                value={catState[idx].age}
                                onChange={handleCatChange}
                            /> */}
                            <img 
                                src={bear}
                                height='25%'
                                width='25%'
                            />
                        </div>
                    );
                })
            }
            <input type="submit" value="Submit" />
        </form>
    );
};

export default Form;

//     const ReviewParticipant= () =>{

//         const classes = useStyles();  

//         const [ownerState, setOwnerState] = useState({
//             owner: '',
//             description: '',
//           });
//         const handleOwnerChange = (e) => setOwnerState({
//         ...ownerState,
//         [e.target.name]: [e.target.value],
//         });

//         const handleBearChange = (e) => {
//             const updatedBears = [...bearState];
//             updatedBears[e.target.dataset.index][e.target.className] =
//             e.target.value;
//             setBearState(updatedBears);
//         };
        
//         const blankBear = {name: '', age: ''}; 
//         const [bearState, setBearState] = useState([
//             {...blankBear}
//         ]);

//         const addBear = () => {
//             setBearState([...bearState, {...blankBear}]);
//         }

//         return(                           
//             <div className={classes.root} style={{marginTop:'10%', height:'100%', width:'100%', position:'absolute'}}>
//                 {/* <form onSubmit={this.onSubmit} style={{height:'100%', width:'100%'}}> */}
//                 <form>
//                     {/* <Paper className={classes.profilePaper} style={{marginBottom:'10%',marginTop:'10%',padding:'2.5%',width:'100%', "background-image" : `url(${board})`}}>
//                         <Grid container >
//                             <Grid item xs={12}> */}
//                                 <label htmlFor="owner">Owner</label>   
//                                 <input 
//                                     type="text" 
//                                     name="owner" 
//                                     id="owner" 
//                                     value={ownerState.owner}
//                                     onChange={handleOwnerChange}
//                                 /> 
//                                 <label htmlFor="description">Description</label> 
//                                 <input 
//                                     type="text" 
//                                     name="description" 
//                                     id="description" 
//                                     value={ownerState.owner}
//                                     onChange={handleOwnerChange}     
//                                 />
//                             {/* </Grid> */}


//                             {/* <Grid item xs={12}> */}
//                                 <button 
//                                     onClick={addBear}
//                                     style={{width:'10%', height:'100%'}}
//                                 >say hello</button>
//                             {/* </Grid>
//                             <Grid item xs={12}> */}
//                                 {
//                                     bearState.map((val, index) => {
//                                         const bearID = `name-${index}`;
//                                         const ageID = `age-${index}`;
//                                         return (
//                                             <div key={`bear-${index}`}>
//                                                 <label htmlFor={bearID}>{`bear #${index+1}`}</label>
//                                                 <input
//                                                     type="text"
//                                                     name={bearID}
//                                                     data-idx={index}
//                                                     id={bearID}
//                                                     className="name" 
//                                                     value={bearState[index].name}
//                                                     onChange={handleBearChange}
//                                                 />
//                                                 <label htmlFor={ageID}>Age</label>
//                                                 <input
//                                                     type="text"
//                                                     name={ageID}
//                                                     data-idx={index}
//                                                     id={ageID}
//                                                     className="age"
//                                                     value={bearState[index].age}
//                                                     onChange={handleBearChange}
//                                                 />

//                                             </div>
//                                         )
//                                     })
//                                 }
//                             {/* </Grid>
//                         </Grid> */}
//                         {/* footer */}
//                         <div class='fixed' style={{width:'100%', position:'fixed', bottom:0,
//                         left: 0,
//                         backgroundColor: 'rgb(76, 175, 80, 0.6)',
//                         color: 'white',
//                         textAlign: 'center'}}>
//                             <Button
//                                 variant="contained"
//                                 size="medium"
//                                 color= 'primary'
//                                 className={classes.button}
//                                 startIcon={<SaveIcon />}
//                                 type="submit"
//                                 style={{margin:'0.5%'}}
                                
//                             >
//                                 Save Reviews
//                             </Button>  
//                         </div>
//                     {/* </Paper> */}
                    
                    
//                 </form>
//             </div> 
//         );
//   }

//   export default ReviewParticipant;

  function getNotifications(){
    if(!isUserLoggedIn)
      return [];
    var notifications = [];
    var username = getCookie("Username");
    $.ajax({ url: 'PHPF/checkrequestnumber.php',
		    type: 'post',
        data: {"host" : username},
        async:false,
		    success: function(out){
          console.log(out, "success");
          let d1 = JSON.parse(out)
          d1.forEach((entity)=> {
            notifications.push(JSON.parse(entity));
          })
          console.log("notifications: ", notifications);
        }
        
    })

    return notifications;
  }

  function Logged() {
    return (
      <div>
        <Button color="inherit" href="/log-in">Login</Button>
        <Button color="inherit" href="/sign-up">Sign-up</Button>
      </div>
    );
  }

  function NotificationBanner(props){
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    console.log("requests", props.requests.length)
    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = event => {
      setAnchorEl(null);
    };

    return(
      <div>
        <IconButton onClick={handleMenu} color="inherit">
          {props.requests.length > 0 ? <NotificationsActiveIcon/> : <NotificationsIcon/>}
        </IconButton>
        <Menu id="notification-banner" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
          <Typography>{props.requests.length} Requests to join your meals:</Typography>
          {props.requests.map((elem)=> (
            <MenuItem component={Link} href={`/show-meal?meal=${elem.meal_id}`} onClick={handleClose}>{elem.num} requests</MenuItem>
          ))}
          

          <Divider/>
          <Typography>Your recent accepted requests:</Typography>
        </Menu>
      </div>
    )
  }

  function MenuBanner() {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const redirection = new Map([["/profile","profile-menu"],["/meals", "meals-menu"],["/settings", "settings-menu"]]); //map of URL: menu value, used to redirect
  
    const handleChange = event => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = event => {
      setAnchorEl(null);
      console.log(event.currentTarget.val);
    };

    const handleLogOut = () => {
      setAnchorEl(null);
      console.log("Log out")
      var decC = decodeURIComponent(document.cookie);
      var tmp = decC.split(';');
      for(var i = 0; i <tmp.length; i++) {
        //find all the cookie names and then change the expiration date
        document.cookie = tmp[i] + "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
      }

    }
    return (
      <div>
        <IconButton edge="end" className={classes.menuButton} onClick={handleMenu} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Menu id="menu-banner" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}
        // anchorOrigin={{
        //   vertical: 'top',
        //   horizontal: 'right',
        // }}
        
        // transformOrigin={{
        //   vertical: 'top',
        //   horizontal: 'right',
        // }}
      >
        {/*todo: change href to correct ones using the map*/}
        <MenuItem val="profile-menu" component={Link} href="/profile" color="inherit" onClick={handleClose}>Profile</MenuItem>
        <MenuItem val="meals-menu" component={Link} href="/meals-user" color="inherit" onClick={handleClose}>My Meals</MenuItem>
        <MenuItem val="show-meals-menu" component={Link} href="/map" color="inherit" onClick={handleClose}>
          <ExploreIcon/>Show me meals
        </MenuItem>
        <MenuItem val="create-meal-menu" component={Link} href="/create-meal" color="inherit" onClick={handleClose}>
          <AddIcon/>Create Meal
        </MenuItem>
        <MenuItem val="settings-menu" component={Link} href="/settings" color="inherit" onClick={handleClose}>
          <SettingsIcon/>Settings
          </MenuItem>
          <MenuItem val="log-out-menu" component={Link} href="/" color="inherit" onClick={handleLogOut}>
            <LogOutIcon /> Log Out
          </MenuItem>
      </Menu>  
    </div>
    )
  }
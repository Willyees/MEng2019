import React from 'react';
import SignInTemplate from './views/sign-up.js';
import LogInTemplate from './views/log-in.js';
import CreateMealTemplate from './views/create-meal.js';
import HomeTemplate from './views/home.js';
import MapTemplate from './views/map.js';
import ProfileTemplate from './views/profile.js';
import ShowMealTemplate from './views/show-meal.js';
import MessagesTemplate from './views/messages.js';
import ViewProfileTemplate from './views/view-profile.js';
import SettingsTemplate from './views/settings.js';
import ReviewTemplate from './views/review.js';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AppBar from './components/AppBar';
import ShowUserMealsTemplate from './views/show-user-meals.js'

var oldM =[{title:"old1", id:"101", img:"bear1.png", date:"02.02.2020"},{title:"old2", id:"102", img:"bear1.png", date:"01.01.2020"}];
var newM = [{title:"new1", id:"103", img:"bear1.png", date:"03.02.2020"}, {title:"new2", id:"104", img:"bear1.png", date:"04.04.2020"}];

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <AppBar />
          <Switch>

            <Route exact path='/meals-user'>
              <ShowUserMealsTemplate oldmeals={oldM} newmeals={newM}/>{/*just for debug. it should not have direct route, but call the component when link clicked*/}
            </Route>

            <Route exact path="/sign-up">
              < SignInTemplate />
            </Route>

            <Route exact path="/log-in">
              < LogInTemplate />
            </Route>
            <Route exact path="/map">
              < MapTemplate />
            </Route>

            <Route exact path="/create-meal">  {/* might have to modify the path, because each meal will have a different URL. Set up atm as work in progress*/}
              < CreateMealTemplate />
            </Route>

            <Route exact path="/profile">
                < ProfileTemplate/>
            </Route>

            <Route exact path="/view-profile">
              < ViewProfileTemplate />
            </Route>

            <Route exact path="/show-meal">
              < ShowMealTemplate />
            </Route>
            <Route exact path="/messages">
              < MessagesTemplate />
            </Route>
            <Route exact path='/settings'>
              <SettingsTemplate/>
            </Route>
            <Route exact path='/review'>
              <ReviewTemplate/>
            </Route>

            <Route exact path="/">
              < HomeTemplate />
            </Route>
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import SignInTemplate from './views/sign-up.js';
import LogInTemplate from './views/log-in.js';
import CreateMealTemplate from './views/create-meal.js';
import HomeTemplate from './views/home.js';
import {MapTemplateView} from './views/map.js';
import ProfileTemplate from './views/profile.js';
import ShowMealTemplate from './views/show-meal.js';
import MessagesTemplate from './views/messages.js';
import ViewProfileTemplate from './views/view-profile.js';
import SettingsTemplate from './views/settings.js';
import ReviewTemplate from './views/review.js';
import AboutTemplate from './views/about.js';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import AppBar from './components/AppBar';
import BottomAppBar from './components/BottomAppBar.js';
import ShowUserMealsTemplate from './views/show-user-meals.js'
import NotFound from './components/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="App App-header">
        <header >
          <AppBar isTopAppBar={true}/>
          <Switch>

            <Route exact path='/meals-user'>
              <ShowUserMealsTemplate limit={false}/>
            </Route>

            <Route exact path="/sign-up">
              < SignInTemplate />
            </Route>

            <Route exact path="/log-in">
              < LogInTemplate />
            </Route>
            <Route exact path="/map">
              <MapTemplateView/>
            </Route>

            <Route exact path="/create-meal">
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
            <Route exact path="/about">
              <AboutTemplate/>
            </Route>
            <Route exact path="/">
              < HomeTemplate />
            </Route>
            <Route path="/404">
              <NotFound/>
            </Route>
            <Redirect to="/404" />
            
          </Switch>
        </header>

        <footer>
          <BottomAppBar/>        
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

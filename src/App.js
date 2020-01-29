import React from 'react';
import SignInTemplate from './views/sign-up.js';
import LogInTemplate from './views/log-in.js';
import CreateMealTemplate from './views/create-meal.js';
import HomeTemplate from './views/home.js';
import MapTemplate from './views/map.js';
import ProfileTemplate from './views/profile.js';
import ShowMealTemplate from './views/show-meal.js';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Switch>
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
            <Route exact path="/show-meal">
              < ShowMealTemplate />
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

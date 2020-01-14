import React from 'react';
import SignInTemplate from './views/sign-up.js';
import LogInTemplate from './views/log-in.js';
import ShowMealTemplate from './views/show-meal.js';
import HomeTemplate from './views/home.js';
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

            <Route exact path="/show-meal">  {/* might have to modify the path, because each meal will have a different URL. Set up atm as work in progress*/}
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

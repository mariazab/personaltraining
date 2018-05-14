import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import Calendar from './Calendar';


class App extends Component {
  render() {
    return (

      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Personal Training</h1>
        </header>
        <BrowserRouter>
        <div>
          <Link to="/customers">Customers</Link>{' '}
          <Link to="/trainings">Trainings</Link>{' '}
          <Link to="/calendar">Calendar</Link>{' '}
          <Switch>
            
            <Route path="/customers" component={Customerlist}/>
            <Route path="/trainings" component={Traininglist}/>
            <Route path="/calendar" component={Calendar}/>
          </Switch>
          </div>
          
          </BrowserRouter>          
        
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import './App.css';
import Fib from './Fib';
import OtherPage from './OtherPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h2 className="App-title">Fibonnaci Calculator</h2>
            <div className="menu">
              <NavLink exact to="/" activeClassName='is-active'>Home</NavLink>
              <NavLink to="/otherpage" activeClassName='is-active'>Dummy Page</NavLink>
            </div>
          </header>
          <div className="App-content">
            <Route exact path="/" component={Fib} />
            <Route path="/otherpage" component={OtherPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../css/App.css';
import Main from './Main';
import Suggestions from "./Suggestions";

export default class App extends Component{
  render() {
    return (
        <Router>
          <div style={{height:'100%'}}>
            <Route path="/" exact component={Main} />
            <Route path="/suggestions/:name/:illness/:pain" exact component={Suggestions} />
          </div>
        </Router>
    )
  }
}

export{App};

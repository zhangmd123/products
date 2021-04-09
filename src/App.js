import React, { Component } from 'react';
import Login from './pages/Login';
import Frame from './pages/admin/Frame';
import { Switch, Route, Redirect } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/admin" component={Frame}></Route>
          <Redirect to="/admin" />
        </Switch>
      </div>
    );
  }
}

export default App;

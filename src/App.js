import React, { Component } from 'react';
import Login from './pages/Login';
import Frame from './pages/admin/Frame';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Store from './context';

class App extends Component {
  state = {
    page: 4,
    current: 2,
  }

  onChangePageInfo = (data) => {
    //从子组件接收的{current : 3}
    console.log(data, 'data');
    this.setState(Object.assign({}, this.state, data || {}))
  }

  render() {
    return (
      <Store.Provider value={{ onChangePageInfo: this.onChangePageInfo, ...this.state }}>
        <div className="app">
          <Switch>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/admin" component={Frame}></Route>
            <Redirect to="/admin" />
          </Switch>
        </div>
      </Store.Provider>
    );
  }
}

export default withRouter(App);

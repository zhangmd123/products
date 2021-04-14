import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class Index extends Component {
    state = {
        islogin: true
    }
    render() {
        return this.state.islogin ? (
            <div>
                <h1>看板</h1>
            </div>
        ) : (<Redirect to="/login" />);
    }
}

export default Index;

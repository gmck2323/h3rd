import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './App.css'


import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import PostNew from './posts/PostNew';
import RTE from './posts/RTE/RTE';


class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render(){
    return (
          <BrowserRouter>
           
                <Header />
                <Route exact path="/" component={Landing} />
                <Route exact path="/posts" component={Dashboard} />
                <Route path="/posts/new" component={PostNew} />
                <Route path="/RTE" component={RTE} />
            
          </BrowserRouter>  
    );
}
};

export default connect(null, actions)(App);

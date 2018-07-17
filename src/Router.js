import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Auth from './Components/Auth';
import Dash from './Components/Dashboard';
import Profile from './Components/Profile';
import Search from './Components/Search';

export default (
    <Switch>
        <Route component={Auth} exact path='/' />
        <Route component={Dash} path='/Dashboard' />
        <Route component={Profile} path='/Profile' />
        <Route component={Search} path='/Search' />
    </Switch>
);
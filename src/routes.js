// ./src/routes.js
import React  from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './pages/Home'
import Introduction from './pages/Introduction';
import App from './App'


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}></IndexRoute>
    <Route path="/introduction" component={Introduction}></Route>
  </Route>
);
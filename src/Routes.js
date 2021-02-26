import React from "react";
import Home from './Home';
import Detail from './Detail';
import Nav from './Nav';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function Routes() {
  return (
      <Router>
        <Nav/>

        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/series/:slug">
            <Detail />
          </Route>

      </Switch>
    </Router>
  );
}

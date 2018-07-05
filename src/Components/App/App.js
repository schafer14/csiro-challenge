import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid } from "react-bootstrap";

import ListContainer from "../../Containers/List/List";
import SingleContainer from "../../Containers/Single/Single";

class App extends Component {
  render() {
    return (
      <Grid>
        <Router>
          <Switch>
            <Route exact path="/" component={ListContainer} />
            <Route exact path="/users" component={ListContainer} />
            <Route exact path="/users/:id" component={SingleContainer} />
          </Switch>
        </Router>
      </Grid>
    );
  }
}

export default App;

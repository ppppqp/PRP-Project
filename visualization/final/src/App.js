import React, { Component } from "react";
import Dashboard from "./Dashboard";
import NavBar from "./components/navbar";
import { Switch, Route, Redirect } from "react-router-dom";
class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar />
        <main>
          <Switch>
            <Route path="/Mentor" component={Dashboard} />
            <Route path="/Topic" component={Dashboard} />
            <Redirect from="/" exact to="/Mentor" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;

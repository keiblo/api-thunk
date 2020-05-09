import React from "react";
import Services from "./components/services";
import EditForm from "./components/edit-form";

import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import "./App.css";

import {Provider} from "react-redux";
import store from "./store";

function App({editMode}) {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Redirect from="/" to="/services" />
          <Route exact path="/services" component={Services} />
          <Route exact path="/services/:id" component={EditForm} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

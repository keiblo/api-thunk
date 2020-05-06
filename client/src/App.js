import React from "react";
import DisplayInput from "./components/display-inputs";
import InputForm from "./components/input-form";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css";

import {Provider} from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Redirect from="/" to="/services" />
          <Route exact path="/services" component={DisplayInput} />
          <Route exact path="/services/:id" component={InputForm} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

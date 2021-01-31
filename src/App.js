import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';

import Home from "./pages/Home"
import Appointments from "./pages/Appointments";
import Patients from "./pages/Patients";
import Patient from "./pages/Patient";

import { Header } from "./components/header"

function App(){
    const date = Date.now()
    console.log(date)
    return (
    <div className="container">
        
      <Router>
          <Header />
          <div className="content">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/patients">
                <Patients />
              </Route>
              <Route path="/appointments">
                <Appointments />
              </Route>
              <Route path="/patient/:id">
                <Patient />
              </Route>
            </Switch>
            </div>

        </Router>
    </div>
    );
  }
export default App;

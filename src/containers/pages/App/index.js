// libraries
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Register from "../Register";
import { Provider } from "react-redux";
import { store } from "../../../config/redux";

// style
import "./App.css";

// img
import logo from "../../../assets/img/logo/logo.svg";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            {/* <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </div> */}

            <Route path="/" exact component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

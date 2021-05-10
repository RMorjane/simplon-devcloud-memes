import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import './menu.js';
import Upload from './upload/Upload'

function App() {
  return (
    <Router>

        <div className="main-nav">
            <div className="logo"></div>
            <ul className="nav-links">
                <li><a href="#"><Link to="/">Home</Link></a></li>
                <li><a href="#"><Link to="/admin">Admin</Link></a></li>
                <li><a href="#"><Link to="/upload">Upload</Link></a></li>
                <li><a href="#"><Link to="/create">Create</Link></a></li>
                <li><a href="#"><Link to="/delete">Delete</Link></a></li>
                <li><a href="#"><Link to="/login">Login</Link></a></li>
                <li><a href="#"><Link to="/logout">Logout</Link></a></li>
            </ul>
            <div id="burger" className="burger">
                  <div className="line line1"></div>
                  <div className="line line2"></div>
                  <div className="line line3"></div>
            </div>
        </div>

        <div className="content-iframe">
          <Switch>

                <Route path="/admin">
                      <Admin />
                </Route>
                <Route path="/upload">
                      <Upload />
                </Route>
                <Route path="/create">
                      <Create />
                </Route>
                <Route path="/delete">
                      <Delete />
                </Route>
                <Route path="/login">
                      <Login />
                </Route>
                <Route path="/logout">
                      <Logout />
                </Route>
                <Route path="/">
                      <Home />
                </Route>

          </Switch>
      </div>

    </Router>
  )
}

function Home() {
  return <h2>Home</h2>;
}

function Admin() {
  return <h2>Admin</h2>;
}

function Create() {
  return <h2>Create</h2>;
}

function Delete() {
  return <h2>Delete</h2>;
}

function Login() {
  return <h2>Login</h2>;
}

function Logout() {
  return <h2>Logout</h2>;
}

export default App;

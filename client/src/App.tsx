import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Signup from './Signup';

function App() {

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact render={Home} />
                    <Route path="/login" exact render={Login} />
                    <Route path="/signup" exact render={Signup} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
        </div>
    );
}
export default App;

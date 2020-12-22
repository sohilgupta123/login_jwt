import React from 'react';
import { useState, useEffect } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import { FORM_ERROR } from 'final-form';

function App() {
    const [token, setToken] = useState("");
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact render={() => <Home token={token} />} />
                    <Route path="/login" exact render={() => <Login setToken={setToken} token={token} />} />
                    <Route path="/signup" exact render={() => <Signup setToken={setToken} token={token} />} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

function Home(props: any) {
    const [name, setName] = useState("");
    useEffect(() => {
        let requestHeaders: any = { 'Content-Type': 'application/json' };
        requestHeaders["Authorization"] = 'Bearer: ' + props.token;
        const response = fetch("http://localhost:4000/", {
            method: "GET",
            mode: 'cors', // no-cors, *cors, same-origin
            //credentials: "include",
            headers: requestHeaders,
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        response.then((body) => {
            if (body.status !== 200) {
                return { [FORM_ERROR]: 'Login Failed' }
            } else {
                if (body.body) {
                    body.json().then((user) => {
                        setName(user.name);
                    });
                }
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    if (props.token === "") {
        return <Redirect to="/login" />
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Welcome {name}</p>
            </header>
        </div>
    );
}
export default App;

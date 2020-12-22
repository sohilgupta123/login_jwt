import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

export default function Login(props: any) {
    const { setToken } = props;
    function validate(values: any) {
        let errors: { username?: string, password?: string } = {};
        if (values.username === "") {
            errors["username"] = "Please fill correct username";
        }
        if (values.password === "") {
            errors["password"] = "Please fill proper password";
        }
        return errors;
    }

    async function onSubmit(values: any) {

        let errors = validate(values);
        if (errors !== {}) {
            Promise.reject(errors);
        }
        const requestBody = JSON.stringify(values);
        let requestHeaders: any = { 'Content-Type': 'application/json' };
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            mode: 'cors', // no-cors, *cors, same-origin
            headers: requestHeaders,
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: requestBody
        });
        if (response.status !== 200) {
            return { [FORM_ERROR]: 'Login Failed' }
        } else {
            if (response.body) {
                let data = await response.json();
                setToken(data.accessToken);
            }
        }
    }

    if (props.token !== "") {
        return <Redirect to="/" />
    }
    return (
        <div className="App">
            <Form onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div>
                            <Field
                                name="username"
                                render={({ input, meta }) => (
                                    <div>
                                        <label>Username</label>
                                        <input {...input} />
                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                    </div>
                                )}
                            />
                            <Field
                                name="password"
                                render={({ input, meta }) => (
                                    <div>
                                        <label>Password</label>
                                        <input {...input} type="password" />
                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                    </div>
                                )}
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                )} />
            <p>Or</p>
            <Link to="/signup">Signup</Link>
        </div>
    );
}
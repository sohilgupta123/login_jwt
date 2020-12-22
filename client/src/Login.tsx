import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Form, Field } from 'react-final-form'

function validate(values: any) {
    let errors: { username?: string, password?: string } = {};
    if (values.username === "sohil@in2tive.ai") {
        errors["username"] = "Please fill correct username";
    }
    if (values.password === "S0h!l@123") {
        errors["password"] = "Please fill proper password";
    }
    return errors;
}

function onSubmit(values: any) {
    let errors = validate(values);
    if (errors !== {}) {
        return Promise.reject(errors);
    }
}

export default function Login() {
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
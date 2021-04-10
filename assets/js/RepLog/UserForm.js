import React, { Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { API_BASE_URL } from './config';

export default class UserForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            plainPassword: '',
            confirmPassword: '',
            errorMessage: '',
            error: false,
            errors: {},
            isLoading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit     = this.onSubmit.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        })
    }

    async onSubmit(e) {
        e.preventDefault();
        if(this.validate()) {
            this.setState({
                isLoading: true,
                error: false,
                errorMessage: ''
            });

            const response = await fetch(API_BASE_URL + '/user/new/true', {
                method: 'POST',
                body: JSON.stringify({
                    "email": this.state.email,
                    "username": this.state.username,
                    "plainPassword": this.state.plainPassword
                })
            });
            const data = await response.json();

            if (data.errors) {
                this.setState({
                    isLoading: false,
                    error: true,
                    errorMessage: data.errors
                });
            } else {
                this.setState({
                    email: '',
                    username: '',
                    plainPassword: '',
                    confirmPassword: '',
                    isLoading: false,
                    error: false,
                    errorMessage: ''
                });
                this.props.onAddition(data);
            }
        }
    }

    validate(){
        let input = this.state;
        let errors = {};
        let isValid = true;

        if (!input["username"]) {
          isValid = false;
          errors["username"] = "Please enter your username.";
        }

        if (!input["email"]) {
          isValid = false;
          errors["email"] = "Please enter your email Address.";
        }

        if (typeof input["email"] !== "undefined") {

          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(input["email"])) {
            isValid = false;
            errors["email"] = "Please enter valid email address.";
          }
        }

        if (!input["plainPassword"]) {
          isValid = false;
          errors["plainPassword"] = "Please enter your password.";
        }

        if (!input["confirmPassword"]) {
          isValid = false;
          errors["confirmPassword"] = "Please enter your confirm password.";
        }

        if (typeof input["plainPassword"] !== "undefined" && typeof input["confirmPassword"] !== "undefined") {

          if (input["plainPassword"] != input["confirmPassword"]) {
            isValid = false;
            errors["plainPassword"] = "Passwords don't match.";
          }
        }

        this.setState({
          errors: errors
        });

        return isValid;
    }

    render() {
        return (
            <div>
                <h4>Create User</h4>
                <Form error={this.state.error} onSubmit={this.onSubmit}>
                    <Form.Field error={this.state.error}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter email"
                            id="email" />

                            <div className="text-danger">{this.state.errors.email}</div>
                    </Form.Field>
                    <Form.Field error={this.state.error}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter username"
                            id="username" />

                            <div className="text-danger">{this.state.errors.username}</div>
                    </Form.Field>
                    <Form.Field error={this.state.error}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="plainPassword"
                            value={this.state.plainPassword}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter password"
                            id="plainPassword" />

                            <div className="text-danger">{this.state.errors.plainPassword}</div>
                    </Form.Field>
                    <Form.Field error={this.state.error}>
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter confirm password"
                            id="confirmPassword" />

                            <div className="text-danger">{this.state.errors.confirmPassword}</div>
                    { this.state.error &&
                    <Message
                        error
                        header='Error creating user'
                        content={this.state.errorMessage}
                    />
                    }
                    </Form.Field>
                    <Button style={{marginTop:8}} className="btn btn-success" type='submit' loading={this.state.isLoading}>Add User</Button>
                </Form>
            </div>
        )
    }
};

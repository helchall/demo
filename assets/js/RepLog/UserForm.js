import React, { Component } from 'react';
import { useState } from "react";
import { Button, Form, Message } from 'semantic-ui-react'

import { API_BASE_URL } from './config'

export default class UserForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            plainPassword: '',
            errorMessage: '',
            error: false,
            isLoading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        })
    }

    async onSubmit(e) {
        e.preventDefault();
        this.setState({
            isLoading: true,
            error: false,
            errorMessage: ''
        });

        const response = await fetch(API_BASE_URL + '/user/new', {
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
                isLoading: false,
                error: false,
                errorMessage: ''
            });
            this.props.onAddition(data);
        }
    }

    render() {
        return (
            <Form error={this.state.error} onSubmit={this.onSubmit}>
                <Form.Field error={this.state.error}>
                    <label>Email</label>
                    <input placeholder='enter email' name="email" value={this.state.email} onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field error={this.state.error}>
                    <label>Username</label>
                    <input placeholder='enter username' name="username" value={this.state.username} onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field error={this.state.error}>
                    <label>Password</label>
                    <input placeholder='enter password' name="plainPassword" value={this.state.plainPassword} onChange={this.handleChange}/>
                { this.state.error &&
                <Message
                    error
                    header='Error creating user'
                    content={this.state.errorMessage}
                />
                }
                </Form.Field>
                <Button type='submit' loading={this.state.isLoading}>Add User</Button>
            </Form>
        )
    }
};

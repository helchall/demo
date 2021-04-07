import React, { Component } from 'react';
import { Header, Message, Table } from 'semantic-ui-react';
import { API_BASE_URL } from './config';
import UserForm from './UserForm';

export default class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null,
            isLoading: null
        };
        this.onAddition = this.onAddition.bind(this);
    }

    onAddition(user) {
        this.setState({
            users: [...this.state.users, user]
        })
    }

    componentDidMount() {
        this.getUsers();
    }

    async getUsers() {
        if (!this.state.users) {
            try {
                this.setState({ isLoading: true });
                const response = await fetch(API_BASE_URL + '/user');
                const data = await response.json();
                this.setState({ users: data, isLoading: false});
            } catch (err) {
                this.setState({ isLoading: false });
                console.error(err);
            }
        }
    }

    render() {
        return (
            <div>
                <Header as="h1">My Users</Header>
                {this.state.isLoading && <Message info header="Loading users..." />}
                {this.state.users &&
                    <div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Roles</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.users.map(
                                    user =>
                                        <tr id={user.id} key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.email}</td>
                                            <td>{user.username}</td>
                                            <td>{user.roles}</td>
                                            <td>
                                                show
                                            </td>
                                        </tr>
                            )}
                            </tbody>
                        </Table>
                        <UserForm onAddition={this.onAddition} />
                    </div>
                }
            </div>
        );
    }
};

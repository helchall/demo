import React, { Component } from 'react';

export default class RepLogApp extends Component {
    render() {
        let heart = '';

        // Check if withHeart is initialized in the script who import this class !
        // withHeart = attribute, prop !
        if (this.props.withHeart) {
            heart = <span>❤️</span>;
        }

        const repLogs = [
            { id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5 },
            { id: 2, reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180 },
            { id: 8, reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72 }
        ];

        // Like a foreach ...
        // const repLogElements = repLogs.map((repLog) => {
        //     return (
        //         <tr key={repLog.id}>
        //             <td>{repLog.itemLabel}</td>
        //             <td>{repLog.reps}</td>
        //             <td>{repLog.totalWeightLifted}</td>
        //             <td>...</td>
        //         </tr>
        //     )
        // });

        // Rename class => className
        return (
            <div className="col-md-7">
                <h2>Lift Stuff! {heart}</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>What</th>
                        <th>How many times?</th>
                        <th>Weight</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* {repLogElements} */}
                    {repLogs.map((repLog) => (
                        <tr key={repLog.id}>
                            <td>{repLog.itemLabel}</td>
                            <td>{repLog.reps}</td>
                            <td>{repLog.totalWeightLifted}</td>
                            <td>...</td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>&nbsp;</td>
                        <th>Total</th>
                        <th>TODO</th>
                        <td>&nbsp;</td>
                    </tr>
                    </tfoot>
                </table>
                <div className="card-body">
                    <h1>Create new User</h1>
                    <form className="form-inline" data-url="{{ path('user_new') }}">
                        <div id="user">
                            <div>
                                <label htmlFor="user_email" className="required">Email</label>
                                <input type="email" id="user_email" name="user[email]" required="required" />
                            </div>
                            <div>
                                <label htmlFor="user_username" className="required">Username</label>
                                <input type="text" id="user_username" name="user[username]" required="required" />
                            </div>
                            <div>
                                <label htmlFor="user_plainPassword_first" className="required">Password</label>
                                <input type="password" id="user_plainPassword_first" name="user[plainPassword][first]" required="required" />
                            </div>
                            <div>
                                <label htmlFor="user_plainPassword_second" className="required">Repeat Password</label>
                                <input type="password" id="user_plainPassword_second" name="user[plainPassword][second]" required="required" />
                            </div>
                            {/* <div>
                                <label className="required">Roles</label>
                                <div id="user_roles">
                                    <label for="user_roles_0" className="required">0</label>
                                    <input type="text" id="user_roles_0" name="user[roles][0]" required="required" value="ROLE_USER" />
                                </div>
                            </div> */}
                        </div>
                        <button className="btn">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

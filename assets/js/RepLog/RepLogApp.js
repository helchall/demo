import React, { Component } from 'react';

export default class RepLogApp extends Component {
    render() {
        let heart = '';

        // Check if withHeart is initialized in the script who import this class !
        // withHeart = attribute, prop !
        if (this.props.withHeart) {
            heart = <span>❤️</span>;
        }

        return (
            <h2>Lift Stuff! { heart }</h2>
        );
    }
}

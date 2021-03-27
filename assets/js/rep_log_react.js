import React, { Component } from 'react';
import ReactDom from 'react-dom';


class RepLogAPP extends Component {
    render() {
        return <h2>Lift Stuff! <span>❤️</span></h2>;
    }
}

console.log(<RepLogAPP/>)

ReactDom.render(<RepLogAPP/>, document.getElementById('lift-stuff-app'));

// assets/js/app.js
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';

// import React from 'react';
// import { render } from 'react-dom';
// import NewUSer from './components/NewUser';
// import { BrowserRouter } from 'react-router-dom';

// render(<BrowserRouter>
//     <NewUSer />
//   </BrowserRouter>, document.getElementById('new_user'));


// assets/js/app.js

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from "./components/Home";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Home/>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'));



// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

// console.log('Hello Webpack Encore! Edit me in assets/js/app.js');

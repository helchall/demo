import React from "react";
import { render } from 'react-dom';
import AppOnglet from "./AppOnglet";

const rootElement = document.getElementById("app-onglet");

render(
    <React.StrictMode>
     <AppOnglet />
   </React.StrictMode>,
   rootElement
);

// ReactDOM.render(
//   <React.StrictMode>
//     <AppOnglet />
//   </React.StrictMode>,
//   rootElement
// );

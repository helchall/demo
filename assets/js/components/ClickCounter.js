import React, { Component } from "react";
import WithCounter from "./WithCounter";

class ClickCounter extends Component {
  constructor(props) {
    super(props);
  }
 render() {
    const { count, increment } = this.props;
    return(
        <button onClick={increment}>
        cliqué {count} fois
        </button>);
  }
}

export default WithCounter(ClickCounter, 2);

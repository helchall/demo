import React, { Component } from "react";
import WithCounter from "./WithCounter";

 class HoverCounter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { count, increment } = this.props;
    return (
        <p onMouseOver={increment}>
            Survolé {count} fois
        </p>
    );
  }
}
export default WithCounter(HoverCounter , 4);

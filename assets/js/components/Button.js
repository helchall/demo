import React, { Component } from 'react';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <button style={styles.button}>
        Je suis un button
      </button>
    );
  }
}
const styles = {
    button : {
        backgroundColor:'green',
        padding: 20,
        color: 'white',
        fontWeight:'bold',
        fontSize: 18,
        borderRadius: 10,
        borderColor:'green'

    }
}

import React, { Component } from 'react';


const WithCounter  = (WrappedComponent , x) => {
    class NewComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
              count: 0,
            };
          }
        increment = () => {
            this.setState((prevState) => {
              return { count: prevState.count + x };
            });
          };
        render() {
          return <WrappedComponent
                   {...this.props}
                   count={this.state.count}
                   increment={this.increment}
                   />
        }
      }
      return NewComponent
}
export default WithCounter;

/***
 * Class Component with state:
 */

import React, { Component } from 'react';

class App extends Component {
  state = {
    count: 0,
    isOn: false,
    mouseX: null,
    mouseY: null
  };

  componentDidMount() {
    document.title = `You have clicked ${this.state.count} times`;

    // on mount we set an event listener to track mouse move:
    window.addEventListener('mousemove', this.handleMouseMove);
    // IMPORTANT: we should stop listen to this event when our component unmount or we no longer need it!!! Otherwise it could lead to memory leek. So we should use ComponentWillUnmount.
  }

  componentDidUpdate() {
    document.title = `You have clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = event => {
    this.setState({
      mouseX: event.pageX,
      mouseY: event.pageY
    });
  };

  incrementCount = () => {
    // its a method of a class so we don't use "const"
    this.setState({
      count: this.state.count + 1
    });
  };

  toggleLight = () => {
    this.setState(prevState => ({
      isOn: !prevState.isOn
    }));
  };

  render() {
    return (
      <>
        {/* Short version of <React.Fragment> */}
        <h2>Counter</h2>
        <button onClick={this.incrementCount}>
          I was clicked {this.state.count} times
        </button>

        <h2>Toggle Light</h2>
        <div
          style={{
            width: '50px',
            height: '50px',
            background: this.state.isOn ? 'grey' : 'yellow'
          }}
          onClick={this.toggleLight}
        />

        <h2>Mouse possition</h2>
        <p>X: {this.state.mouseX}</p>
        <p>Y: {this.state.mouseY}</p>
      </>
    );
  }
}

export default App;

import React, { Component } from 'react';

import T from './Typography'
import Toolbar from './Toolbar'
import Checkbox from './Checkbox'
import Button from './Button'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    checked: true
  }

  handleOnChange = () => this.setState(state => ({ checked: !state.checked }))
  handleClick = e => console.log(e)

  render() {
    const [ H1, P ] = [T('h1'), T('p')]

    return (
      <div className="App">
        <Toolbar />
        <Checkbox checked={this.state.checked} onChange={this.handleOnChange} />
        <Button onClick={this.handleClick} accent raised />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="mdc-typography--display2">Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <H1 type="display4" adjustMargin>Hello World</H1>
        <P>Material.io</P>
      </div>
    );
  }
}

export default App;

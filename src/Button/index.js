import React from 'react'
import { MDCRipple } from '@material/ripple/dist/mdc.ripple'

class Button extends React.PureComponent {

  state = {
    classes: [],
    disabled: this.props.disabled
  }

  componentDidMount() {
    MDCRipple.attachTo(document.querySelector('.mdc-button'));
    this.init()

  }

  init = () => {
    const get = prop => this.props[prop] && `mdc-button--${prop}`
    const types = ['raised', 'primary', 'dense', 'compact', 'accent']
    const typesMap = types.map(get).filter(f => f)

    this.setState(state => ({ classes: [...state.classes, ...typesMap] }))
  }

  render() {
    return (
      <button
        className={['mdc-button'].concat(this.state.classes).join(' ')}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    )
  }
}

export default Button

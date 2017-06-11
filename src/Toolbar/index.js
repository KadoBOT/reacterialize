import React from 'react'
import {MDCToolbar, MDCToolbarFoundation} from '@material/toolbar';
import '@material/toolbar/dist/mdc.toolbar.css'

const Row = ({children}) => (
  <div className="mdc-toolbar__row">
    {children}
  </div>
)

const Section = () => (
  <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
    <a href="#" className="material-icons">menu</a>
    <span className="mdc-toolbar__title">Title</span>
  </section>
)

class Toolbar extends React.Component {
  state = {
    classes: [],
  }

  foundation = new MDCToolbarFoundation({
  //   hasClass: className =>
    addClass: className => this.setState(state => ({ classes: [...state.classes, className] })),
    removeClass: className => this.setState(state => ({ classes: state.classes.filter(c => c !== className) }))
  //   registerScrollHandler: handler => console.log(handler)
  //   deregisterScrollHandler:
  //   registerResizeHandler:
  //   deregisterResizeHandler:
  //   getViewportWidth:
  //   getViewportScrollY:
  //   getOffsetHeight:
  //   getFlexibleRowElementOffsetHeight:
  //   notifyChange:
  //   setStyle:
  //   setStyleForTitleElement:
  //   setStyleForFlexibleRowElement:
  //   setStyleForFixedAdjustElement:
  })

  componentWillMount() {
    this.foundation.init()
  }

  componentWillUnmount() {
    this.foundation.destroy()
  }

  setRef = ref => this.ref = ref

  render() {
    return (
      <header className={['mdc-toolbar'].concat(this.state.classes).join(' ')} ref={this.setRef}>
        <Row>
          <Section />
        </Row>
      </header>
    )
  }
}

export default Toolbar

import React from 'react'
import { getCorrectEventName } from '@material/animation/dist/mdc.animation'
import { MDCCheckboxFoundation } from '@material/checkbox/dist/mdc.checkbox'
import { MDCRipple, MDCRippleFoundation } from '@material/ripple/dist/mdc.ripple'

const getMatchesProperty = (HTMLElementPrototype) =>
  ['webkitMatchesSelector', 'msMatchesSelector', 'matches']
    .filter((p) => p in HTMLElementPrototype).pop();

const {ANIM_END_EVENT_NAME} = MDCCheckboxFoundation.strings;

const MATCHES = getMatchesProperty(HTMLElement.prototype);

class Checkbox extends React.Component {
  state = {
    classes: [],
    rippleCss: {},
    checked: this.props.checked,
    disabled: this.props.disabled,
    indeterminate: this.props.indeterminate
  }

  defaultProps = {
    checked: false,
    onChange: () => {},
    disabled: false,
    indeterminate: false,
  }

  foundation = new MDCCheckboxFoundation({
    addClass: className => this.setState(state => ({ classes: [...state.classes, className] })),
    removeClass: className => this.setState(state => ({ classes: state.classes.filter(c => c !== className) })),
    registerAnimationEndHandler: handler => {
      if (this.root) {
        this.root.addEventListener(getCorrectEventName(window, 'animationend'), handler);
      }
    },
    deregisterAnimationEndHandler: handler => {
      if (this.root) {
        this.root.removeEventListener(getCorrectEventName(window, 'animationend'), handler)
      }
    },
    registerChangeHandler: handler => {
      // Note that this could also be handled outside of using the native DOM API.
      // For example, onChange within render could delegate to a function which calls
      // the handler passed here, as well as performs the other business logic. The point
      // being our foundations are designed to be adaptable enough to fit the needs of the host
      // platform.
      if (this.nativeCb) {
        this.nativeCb.addEventListener('change', handler);
      }
    },
    deregisterChangeHandler: handler => {
      if (this.nativeCb) {
        this.nativeCb.removeEventListener('change', handler);
      }
    },
    getNativeControl: () => {
      if (!this.nativeCb) {
        throw new Error('Invalid state for operation');
      }
      return this.nativeCb;
    },
    forceLayout: () => {
      if (this.nativeCb) {
        this.nativeCb.offsetWidth;
      }
    },
    isAttachedToDOM: () => Boolean(this.nativeCb),
  })

  rippleFoundation = new MDCRippleFoundation({
    ...MDCRipple.createAdapter(this),
    isUnbounded: () => true,
    isSurfaceActive: () => this.nativeCb[MATCHES](':active'),
    isSurfaceDisabled: () => this.state.disabled,
    addClass: className => {
      this.setState(prevState => ({
        classes: [...prevState.classes, className]
      }));
    },
    removeClass: className => {
      this.setState(prevState => ({
        classes: prevState.classes.filter(c => c !== className)
      }));
    },
    registerInteractionHandler: (evtType, handler) => {
      this.nativeCb.addEventListener(evtType, handler);
    },
    deregisterInteractionHandler: (evtType, handler) => {
      this.nativeCb.removeEventListener(evtType, handler);
    },
    updateCssVariable: (varName, value) => {
      this.setState(prevState => ({
        rippleCss: {...prevState.rippleCss, [varName]: value}
      }));
    },
    computeBoundingRect: () => {
      const {left, top} = this.root.getBoundingClientRect();
      const DIM = 40;
      return {
        top,
        left,
        right: left + DIM,
        bottom: top + DIM,
        width: DIM,
        height: DIM,
      };
    },
  });

  componentDidMount() {
    this.foundation.init()
    this.rippleFoundation.init();
  }

  componentWillUnmount() {
    this.foundation.destroy()
    this.rippleFoundation.destroy();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({checked: nextProps.checked, indeterminate: false});
    }
    if (nextProps.indeterminate !== this.props.indeterminate) {
      this.setState({indeterminate: nextProps.indeterminate});
    }
    if (nextProps.disabled !== this.props.disabled) {
      this.setState({disabled: nextProps.disabled});
    }
  }

  // Since we cannot set an indeterminate attribute on a native checkbox, we use componentDidUpdate to update
  // the indeterminate value of the native checkbox whenever a change occurs (as opposed to doing so within
  // render()).
  componentDidUpdate() {
    if (this.nativeCb) {
      this.nativeCb.indeterminate = this.state.indeterminate;
    }
    // To make the ripple animation work we update the css properties after React finished building the DOM.
    if (this.root) {
      var { rippleCss } = this.state
      for (var [k, v] of Object.entries(rippleCss)) {
        this.root.style.setProperty(k, v);
      }
    }
  }

  setRef = ref => this[ref.id] = ref

  render() {
  // Within render, we generate the html needed to render a proper MDC-Web checkbox.
  return (
    <div
      id="root"
      ref={this.setRef}
      className={['mdc-checkbox'].concat(this.state.classes).join(' ')}
    >
      <input
        id="nativeCb"
        ref={this.setRef}
        checked={this.state.checked}
        type="checkbox"
        disabled={this.state.disabled}
        className="mdc-checkbox__native-control"
        onChange={this.props.onChange}
      />
      <div className="mdc-checkbox__background">
        <svg
          className="mdc-checkbox__checkmark"
          viewBox="0 0 24 24"
        >
          <path
            className="mdc-checkbox__checkmark__path"
            fill="none"
            stroke="white"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"
          />
        </svg>
        <div className="mdc-checkbox__mixedmark"></div>
      </div>
    </div>
  );
}
}

export default Checkbox

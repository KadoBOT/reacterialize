/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from '../Button';
import Checkbox from '../Checkbox';
import Welcome from './Welcome';
import '../../node_modules/material-components-web/dist/material-components-web.css'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('default', () => <Button onClick={action('clicked')}>Default</Button>)
  .add('raised', () => <Button onClick={action('clicked')} raised>Raised</Button>)
  .add('dense', () => <Button onClick={action('clicked')} dense>Dense</Button>)
  .add('dense raised', () => <Button onClick={action('clicked')} dense raised>Dense Raised</Button>)
  .add('compact', () => <Button onClick={action('clicked')} compact>Compact</Button>)
  .add('compact raised', () => <Button onClick={action('clicked')} compact raised>Compact Raised</Button>)
  .add('default primary', () => <Button onClick={action('clicked')} primary>Primary</Button>)
  .add('raised primary', () => <Button onClick={action('clicked')} primary raised>Raised Primary</Button>)
  .add('default w/ accent', () => <Button onClick={action('clicked')} primary accent>Default w/ Accent</Button>)
  .add('raised w/ accent', () => <Button onClick={action('clicked')} raised accent>Raised w/ Accent</Button>)

storiesOf('Checkbox', module)
.add('disabled checked', () => <Checkbox onChange={action('changed')} disabled checked />)
  .add('default', () => <Checkbox onChange={action('changed')} />)
  .add('checked', () => <Checkbox onChange={action('changed')} checked />)
  .add('indeterminate', () => <Checkbox onChange={action('changed')} indeterminate />)
  .add('disabled', () => <Checkbox onChange={action('changed')} disabled />)

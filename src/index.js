import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import '../node_modules/material-components-web/dist/material-components-web.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

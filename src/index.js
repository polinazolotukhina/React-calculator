import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './Calculator';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Calculator />, document.getElementById('root'));
registerServiceWorker();

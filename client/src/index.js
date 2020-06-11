import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store  from './redux/store';
import * as ServiceWorker from './serviceWorker';


import App from './App';

const MyAppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <MyAppWithStore />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// PWA
ServiceWorker.register();
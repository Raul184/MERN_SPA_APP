import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import {store}  from './redux/store';
import {persistor}  from './redux/store';
import App from './App';
import * as ServiceWorker from './serviceWorker';

// const MyAppWithStore = () => (
//   <PersistGate persistor={persistor}>
//     <App />
//   </PersistGate>
// );

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// PWA
ServiceWorker.register();
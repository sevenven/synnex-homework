import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import RootStore from './stores/index';
import App from './App';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = new RootStore();

root.render(
  <React.StrictMode>
    <Router>
      <Provider {...store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
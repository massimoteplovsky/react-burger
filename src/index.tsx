import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './services/store';

// Components
import App from './components/app/app';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="/react-burger">
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

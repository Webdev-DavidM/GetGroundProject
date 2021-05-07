import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import booksReducer from './Reducers/booksReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  booksReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App className='app' />
  </Provider>,
  document.getElementById('root')
);

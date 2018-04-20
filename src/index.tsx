import './index.css';
import * as React from 'react';
import { render as ReactRender } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './state';
import Main from './components/main';
import IState from './types/IState';

const store: any  = createStore(Reducer, {
  screen_data: {
    width: window.innerWidth,
    height: window.innerHeight
  }
});

document.addEventListener('DOMContentLoaded', () => {
  ReactRender((
    <Provider store={store}>
      <Main />
    </Provider>
  ), document.getElementById('main'));
});
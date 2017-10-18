import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import AppNavigator from './src/config/routes';
import AppReducer from './src/reducers/index';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, reduxLogger)(createStore);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(AppReducer)}>
        <AppNavigator />
      </Provider>
    );
  }
}
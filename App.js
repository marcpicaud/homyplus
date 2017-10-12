import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { StackNavigator, TabNavigator, AddNavigationHelpers } from "react-navigation";
import { createAppNavigator } from './src/config/routes';

import reducer from './src/reducers/index';

const firebaseConfig = {
    apiKey: "AIzaSyBWuZgjnCD8gnuRRjptvt3LmxZCYhet6uw",
    authDomain: "homyplus-87df6.firebaseapp.com",
    databaseURL: "https://homyplus-87df6.firebaseio.com",
    projectId: "homyplus-87df6",
    storageBucket: "homyplus-87df6.appspot.com",
    messagingSenderId: "1042138345920"
};
const reduxFirebaseConfig = {
  userProfile: 'users',
  enableLogging: false,
  ReactNative: {
    AsyncStorage
  }
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, reduxFirebaseConfig),
)(createStore)

const initialState = { firebase: { authError: null, auth: undefined }}

const store = createStoreWithFirebase(reducer, initialState);


export default class App extends React.Component {
  render() {
    const Layout = createAppNavigator();
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}
import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { StackNavigator, TabNavigator, AddNavigationHelpers } from "react-navigation";
import { createAppNavigator } from './src/config/routes';
import AppReducer from './src/reducers/index';
import { Alert, StyleSheet, View, Share, KeyboardAvoidingView } from 'react-native';
import { Divider, Header, Button, Card, Text, FormInput, FormLabel } from 'react-native-elements';
import * as actions from './src/actions/actionsCreators';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

export default class App extends React.Component {
  render() {
    const Layout = createAppNavigator();
    return (
      <Provider store={createStoreWithMiddleware(AppReducer)}>
        <Layout />
      </Provider>
    );
  }
}
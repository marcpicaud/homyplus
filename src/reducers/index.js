import { combineReducers } from 'redux';
import authenticationReducer from './authentication';
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase';

export default combineReducers({
    firebase: firebaseStateReducer
})
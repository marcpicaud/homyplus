import { combineReducers } from 'redux';
import authenticationReducer from './authentication';
import _ from 'lodash';

const initialState = {
    // undefined means not loaded yet by firebase sdk. null means no home.
    home: undefined,
    errorJoinHome: null
}

export default function AppReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGOUT':
            return _.omit(state, ['currentUser', 'home'] );
        case 'SET_PASSWORD_RESET_STATUS':
            return {...state, passwordResetStatus: action.payload}
        case 'SET_SIGNUP_ERROR':
            return {...state, signupError: action.payload}
        case 'UNSET_SIGNUP_ERROR':
            return _.omit(state, 'signupError')
        case 'SET_LOGIN_ERROR':
            return {...state, loginError: action.payload}
        case 'UNSET_LOGIN_ERROR':
            return _.omit(state, 'loginError')
        case 'LOGIN':
            return {...state, currentUser: action.payload}
        case 'FETCH_HOME':
            return {...state, home: action.payload}
        case 'DELETE_HOME':
            return {...state, home: null}
        case 'SET_ERROR_JOIN_HOME':
            return {...state, errorJoinHome: action.payload};
        case 'SET_NO_ERROR_JOIN_HOME':
            return {...state, errorJoinHome: null};
        default:
            return state
    }
}
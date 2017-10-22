import _ from 'lodash';
import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  // undefined means not loaded yet by firebase sdk.
  // null means no home.
  home: undefined,
  homeMembers: {},
  homeEvents: undefined,
  errorJoinHome: null,
};


export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    // Removes the currentUser slice
    case ActionTypes.LOGOUT:
      return _.omit(state, ['currentUser', 'home']);

    // Sets the passwordResetStatus slice
    case ActionTypes.SET_PASSWORD_RESET_STATUS:
      return { ...state, passwordResetStatus: action.payload };

    // Sets the signupError slice of the store after a failed signup
    case ActionTypes.SET_SIGNUP_ERROR:
      return { ...state, signupError: action.payload };

    // Removes the signupError slice
    case ActionTypes.UNSET_SIGNUP_ERROR:
      return _.omit(state, 'signupError');

    // Sets the loginError slice
    case ActionTypes.SET_LOGIN_ERROR:
      return { ...state, loginError: action.payload };

    // Removes the loginError slice
    case ActionTypes.UNSET_LOGIN_ERROR:
      return _.omit(state, 'loginError');

    // Sets the currentUser slice
    case ActionTypes.LOGIN:
      return { ...state, currentUser: action.payload };

    // Sets the home slice
    case ActionTypes.FETCH_HOME:
      return { ...state, home: action.payload };

    // Removes the home slice
    case ActionTypes.DELETE_HOME:
      return { ...state, home: null };

    // Sets the errorJoinHome slice
    case ActionTypes.SET_ERROR_JOIN_HOME:
      return { ...state, errorJoinHome: action.payload };

    // Sets the errorJoinHome slice
    case ActionTypes.SET_NO_ERROR_JOIN_HOME:
      return { ...state, errorJoinHome: null };

    // Sets the homeMembers slice
    case ActionTypes.SET_HOME_MEMBERS:
      return { ...state, homeMembers: action.payload };

    // Unsets the homeMember slice
    case ActionTypes.UNSET_HOME_MEMBERS:
      return { ...state, homeMembers: {} };

    // Sets the homeEvent slice
    case ActionTypes.SET_HOME_EVENTS:
      return { ...state, homeEvents: action.payload };

    case ActionTypes.UNSET_HOME_EVENTS:
      return { ...state, homeEvents: {} };

    default:
      console.log('Action type not defined : ', action.type);
      console.log('Debug: ', action);
      return state;
  }
}

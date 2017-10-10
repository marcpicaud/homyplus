import * as types from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    waitingForLogin: false
};

export default function authenticationReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN: {
            return {...state, isLoggedIn: true}
        }
        case types.LOGOUT:
            return {...state, isLoggedIn: false}; 
        default:
            return state;
    }
}

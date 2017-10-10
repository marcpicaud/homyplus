import * as types from './actionTypes';

export function loginAction() {
    return {
        type:types.LOGIN
    }
}

// export function loginActionAsync(email, password) {
//     return dispatch => {
//         dispatch(types.START_LOGIN);
//         firebase
//             .auth()
//             .signInWithEmailAndPassword(email, password)
//             .then(() => dispatch(loginAction()))
//     }
// }

export function logoutAction() {
    return {
        type: types.LOGOUT
    }
}

export function registerAction() {
    return {
        type: types.REGISTER
    }
}
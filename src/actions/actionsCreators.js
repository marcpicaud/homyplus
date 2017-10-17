import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBWuZgjnCD8gnuRRjptvt3LmxZCYhet6uw",
    authDomain: "homyplus-87df6.firebaseapp.com",
    databaseURL: "https://homyplus-87df6.firebaseio.com",
    projectId: "homyplus-87df6",
    storageBucket: "homyplus-87df6.appspot.com",
    messagingSenderId: "1042138345920"
};
firebase.initializeApp(config);

const Users = firebase.database().ref('users');
const Homes = firebase.database().ref('homes');
const Events = firebase.database().ref('events');
const Db = firebase.database().ref();
const Auth = firebase.auth();

// Sets the currentUser slice of the store
export function login(email, password) {
    return dispatch => {
        Auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                // firebase.auth() contains a currentUser
                // property after a successful signin
                dispatch({
                    type: 'LOGIN',
                    payload: Auth.currentUser
                })
                
                const homeId = Users.child(Auth.currentUser.uid).child('group').once('value', (snapshot) => {
                    if (snapshot.val()) {
                        dispatch(fetchHome(snapshot.val()));
                    } else {
                        dispatch(fetchHome(null));
                    }
                })
            })
            .catch(error => {
                console.error(error);
                dispatch(setLoginError(error))
            })
    }
}

export function signup(email, password, username) {
    return dispatch => {
        Auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            // On successful creation of the user account, this user will also be signed in
            dispatch({
                type: 'LOGIN',
                payload: Auth.currentUser
            })

            Users.child(Auth.currentUser.uid).set({
                email: Auth.currentUser.email,
                username: username
            });
        })
        .catch(error => {
            dispatch(setSignupError(error))
        })

    }
}

export function sendPasswordResetEmail(email) {
    return dispatch => {
        Auth.sendPasswordResetEmail(email)
            .then(() => dispatch(setPasswordResetStatus('Email sent')))
            .catch(error => dispatch(setPasswordResetStatus(`${error.code} ${error.message}`)))
    }
}

export function setPasswordResetStatus(status = null) {
    return {
        type: 'SET_PASSWORD_RESET_STATUS',
        payload: status
    }
}

export function setSignupError(error) {
    return {
        type: 'SET_SIGNUP_ERROR',
        payload: `${error.code} ${error.message}`
    }
}

export function unsetSignupError() {
    return {
        type: 'UNSET_SIGNUP_ERROR'
    }
}

export function setLoginError(error) {
    return {
        type: 'SET_LOGIN_ERROR',
        payload: `${error.code} ${error.message}`
    }
}

export function unsetLoginError() {
    return {
        type: 'UNSET_LOGIN_ERROR'
    }
}

// Remove the currentUser slice of the store
export function logout() {
    return dispatch => {
        Users.child(`${Auth.currentUser.uid}`).child('group').once('value', (snapshot) => {
            if (snapshot.val()) {
                dispatch(unsetHome(snapshot.val()));
            }
        })
        Auth.signOut().then(() => { 
            dispatch({type: 'LOGOUT'});
        })
    }
}

// Creates a home inside firebase realtime DB
export function createHome(homeName, uid) {
    return dispatch => {
        const key = Homes.push().key;
        const newData = {
            [`homes/${key}/name`]: homeName,
            [`homes/${key}/members/${uid}`]: true,
            [`users/${uid}/group`]: key
        }
        Db.update(newData);
        
        dispatch(fetchHome(key))
    }
}

// Fetch a home by its key and set a listener
export function fetchHome(key = null) {
    return dispatch => {
        if (key) {
            Homes.child(key).on('value', (snapshot) => {
                dispatch({
                    type: 'FETCH_HOME',
                    payload: Object.assign({key: key}, snapshot.val())
                })
            })
        } else {
            dispatch({
                type: 'FETCH_HOME',
                payload: null
            });
        }
        
    }
}

// 
export function joinHome(key, uid) {
    return dispatch => {
        Homes.child(key).once('value', snapshot => {
            if (!snapshot.val()) {
                dispatch(setErrorJoinHome())
            } else {
                const newData = {
                    [`homes/${key}/members/${uid}`]: true,
                    [`users/${uid}/group`]: key
                }
                Db.update(newData)
                dispatch(fetchHome(key));
            }
        })
    }
}

// Sets an error message after a failed
// home join event
export function setErrorJoinHome() {
    return {
        type: 'SET_ERROR_JOIN_HOME',
        payload: 'Home does not exists'
    }
}

// Removes the error message generated
// during a failed home join event
export function setNoErrorJoinHome() {
    return {
        type: 'SET_NO_ERROR_JOIN_HOME'
    }
}

// Remove DB relationship between user and home
// then remove the data from the store
export function leaveHome(key, uid) {
    return dispatch => {
        const newData = {
            [`homes/${key}/members/${uid}`]: null,
            [`users/${uid}/group`]: null
        }
        Db.update(newData);
        dispatch(unsetHome(key));
    }
}

export function unsetHome(key) {
    let myRef = Homes.child(key);
    myRef.off('value');
    return {
        type: 'DELETE_HOME'
    };
}
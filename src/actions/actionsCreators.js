import firebase from 'firebase';
import * as ActionTypes from './actionTypes';

// TODO: environments variables
firebase.initializeApp({
  apiKey: 'AIzaSyBWuZgjnCD8gnuRRjptvt3LmxZCYhet6uw',
  authDomain: 'homyplus-87df6.firebaseapp.com',
  databaseURL: 'https://homyplus-87df6.firebaseio.com',
  projectId: 'homyplus-87df6',
  storageBucket: 'homyplus-87df6.appspot.com',
  messagingSenderId: '1042138345920',
});

const Users = firebase.database().ref('users');
const Homes = firebase.database().ref('homes');
const Events = firebase.database().ref('events');
const Db = firebase.database().ref();
const Auth = firebase.auth();

// Sets the currentUser slice of the store
export function login(email, password) {
  return (dispatch) => {
    Auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // firebase.auth() contains a currentUser
        // property after a successful signin
        dispatch({
          type: ActionTypes.LOGIN,
          payload: Auth.currentUser,
        });

        // Determines wether the user has a home ("group") or not
        Users.child(Auth.currentUser.uid).child('group').once('value', (snapshot) => {
          if (snapshot.val()) {
            dispatch(fetchHome(snapshot.val()));
            dispatch(fetchHomeMembers(snapshot.val()));
            dispatch(fetchHomeEvents(snapshot.val()));
          } else {
            dispatch(fetchHome(null));
          }
        });
      })
      .catch((error) => {
        console.error(error);
        dispatch(setLoginError(error));
      });
  };
}

// Sets the homeMembers slice of the store
export function fetchHomeMembers(key) {
  return (dispatch) => {
    Users.orderByChild('group').equalTo(key).on('value', (snapshotData) => {
      if (!snapshotData.val()) {
        dispatch({
          type: ActionTypes.SET_HOME_MEMBERS,
          payload: {},
        });
      } else {
        dispatch({
          type: ActionTypes.SET_HOME_MEMBERS,
          payload: snapshotData.val(),
        });
      }
    });
  };
}

// Sets the homeEvents slice of the store
export function fetchHomeEvents(homeKey) {
  return (dispatch) => {
    Events.child(homeKey).on('value', (snapshot) => {
      if (!snapshot.val()) {
        dispatch({
          type: ActionTypes.SET_HOME_EVENTS,
          payload: {},
        });
      } else {
        dispatch({
          type: ActionTypes.SET_HOME_EVENTS,
          payload: snapshot.val(),
        });
      }
    });
  };
}

// Creates a user in DB and signs the user in
export function signup(email, password, username) {
  return (dispatch) => {
    Auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        // On successful creation of the user account, this user will also be signed in
        dispatch({
          type: ActionTypes.LOGIN,
          payload: Auth.currentUser,
        });

        // Save some user info into realtime database
        Users.child(Auth.currentUser.uid).set({
          email: Auth.currentUser.email,
          username,
        });
      })
      .catch((error) => {
        dispatch(setSignupError(error));
      });
  };
}

// Triggers firebase reset password procedure
export function sendPasswordResetEmail(email) {
  return (dispatch) => {
    Auth.sendPasswordResetEmail(email)
      .then(() => dispatch(setPasswordResetStatus('Email sent')))
      .catch(error => dispatch(setPasswordResetStatus(`${error.code} ${error.message}`)));
  };
}

// Updates passwordResetStatus slice of the store
export function setPasswordResetStatus(status = null) {
  return {
    type: ActionTypes.SET_PASSWORD_RESET_STATUS,
    payload: status,
  };
}

// Updates signupError slice of the store
export function setSignupError(error) {
  return {
    type: ActionTypes.SET_SIGNUP_ERROR,
    payload: `${error.code} ${error.message}`,
  };
}

// Removes signupError slice of the store
export function unsetSignupError() {
  return {
    type: ActionTypes.UNSET_SIGNUP_ERROR,
  };
}

// Updates loginError slice of the store
export function setLoginError(error) {
  return {
    type: ActionTypes.SET_LOGIN_ERROR,
    payload: `${error.code} ${error.message}`,
  };
}

// Removes loginError slice of the store
export function unsetLoginError() {
  return {
    type: ActionTypes.UNSET_LOGIN_ERROR,
  };
}

// Logout the user and Remove the currentUser slice of the store
export function logout() {
  return (dispatch) => {
    Users.child(`${Auth.currentUser.uid}`).child('group').once('value', (snapshot) => {
      if (snapshot.val()) {
        dispatch(unsetHome(snapshot.val()));
        dispatch(unsetHomeMembers(snapshot.val()));
        dispatch(unsetHomeEvents(snapshot.val()));
      }
    });
    Auth.signOut().then(() => {
      dispatch({ type: ActionTypes.LOGOUT });
    });
  };
}

// Creates a home inside firebase realtime DB
export function createHome(homeName, uid) {
  return (dispatch) => {
    const { key } = Homes.push();
    const newData = {
      [`homes/${key}/name`]: homeName,
      [`homes/${key}/members/${uid}`]: true,
      [`users/${uid}/group`]: key,
    };
    Db.update(newData);
    dispatch(fetchHome(key));
    dispatch(fetchHomeMembers(key));
    dispatch(fetchHomeEvents(key));
  };
}

// Fetch a home by its key and set a listener
export function fetchHome(key = null) {
  return (dispatch) => {
    if (key) {
      // callback will be fired everytime the data is updated
      Homes.child(key).on('value', (snapshot) => {
        dispatch({
          type: ActionTypes.FETCH_HOME,
          payload: Object.assign({ key }, snapshot.val()),
        });
      });
    } else {
      dispatch({
        type: ActionTypes.FETCH_HOME,
        payload: null,
      });
    }
  };
}

// Join a home via invitation key
export function joinHome(key, uid) {
  return (dispatch) => {
    Homes.child(key).once('value', (snapshot) => {
      if (!snapshot.val()) {
        // invalid code
        dispatch(setErrorJoinHome());
      } else {
        // each key represents a firebase location
        // each value represents the data to update at this location
        const newData = {
          [`homes/${key}/members/${uid}`]: true,
          [`users/${uid}/group`]: key,
        };
        Db.update(newData);
        // update store
        dispatch(fetchHome(key));
        dispatch(fetchHomeMembers(key));
        dispatch(fetchHomeEvents(key));
      }
    });
  };
}

// Sets an error message after a failed
// home join event
export function setErrorJoinHome() {
  return {
    type: ActionTypes.SET_ERROR_JOIN_HOME,
    payload: 'Home does not exists',
  };
}

// Removes the error message generated
// during a failed home join event
export function setNoErrorJoinHome() {
  return {
    type: ActionTypes.SET_NO_ERROR_JOIN_HOME,
  };
}

// Remove DB relationship between user and home
// then remove the data from the store
export function leaveHome(key, uid) {
  return (dispatch) => {
    const newData = {
      [`homes/${key}/members/${uid}`]: null,
      [`users/${uid}/group`]: null,
    };
    Db.update(newData);
    dispatch(unsetHome(key));
    dispatch(unsetHomeMembers(key));
    dispatch(unsetHomeEvents(key));
  };
}

// Remove the home slice of the store
export function unsetHome(key) {
  // Remove all firebase data listeners
  Homes.child(key).off('value');
  return {
    type: ActionTypes.DELETE_HOME,
  };
}

export function unsetHomeMembers(key) {
  Users.orderByChild('group').equalTo(key).off();
  return {
    type: ActionTypes.UNSET_HOME_MEMBERS,
  };
}

export function unsetHomeEvents(key) {
  Events.child(key).off();
  return {
    type: ActionTypes.UNSET_HOME_EVENTS,
  };
}

export function createEvent(homeKey, event) {
  return (dispatch) => {
    const { key } = Events.child(homeKey).push();
    Db.update({
      [`events/${homeKey}/${key}`]: event,
    });
  };
}

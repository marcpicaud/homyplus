import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as styles from '../style';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import logoutAction from '../actions/actionsCreators';
import { firebaseConnect, pathToJS, dataToJS, isLoaded } from 'react-redux-firebase';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';

@firebaseConnect(
    (props, firebase) => (
        [
            { path: 'homes', queryParams: ['orderByChild=admin', `equalTo=${firebase.auth().currentUser.uid}`] }
        ]
    )
)
@connect(
    // Map state to props
    ({ firebase }) => ({
        homes: dataToJS(firebase, 'homes'), 
        authError: pathToJS(firebase, 'authError'),
        auth: pathToJS(firebase, 'auth'),
        profile: pathToJS(firebase, 'profile')
    })
)
export default class UserSettings extends React.Component {
    handleLogout() {
        this.props.firebase.logout();
        this.props.navigation.navigate('signedOutLayout');
    }


    render() {
        return (
            <View style={{marginTop:20}}>
                <Text>SETTINGS SCREEN</Text>
                <Button title="LOG OUT" onPress={() => this.handleLogout()} />
            </View>
        );
    }
}
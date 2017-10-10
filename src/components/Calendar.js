import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as styles from '../style';
import { firebaseConnect,dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';

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
export default class Calendar extends React.Component {

    render() {
        // react-redux-firebase is not ready
        if (!isLoaded(this.props.auth) || isEmpty(this.props.auth)) {
            return (
                <View style={{marginTop:20}}>
                    <Text>Loading...</Text>
                </View>
            )
        }

        // User has a home
        if (this.props.homes) {
            return (
                <View style={{ marginTop: 20 }}>
                    <Text>CALENDAR SCREEN</Text>
                </View>
            );
        }

        // User doesn't have a home
        return (
            <View style={{ marginTop: 20 }}>
                <Text>PLEASE JOIN A HOME OR CREATE ONE TO USE THE CALENDAR</Text>
            </View>
        );
    }
}
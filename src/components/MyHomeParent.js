import React from 'react';
import { Alert, StyleSheet, View, Share, KeyboardAvoidingView } from 'react-native';
import { Divider, Header, Button, Card, Text, FormInput, FormLabel } from 'react-native-elements';
import * as styles from '../style';
import { firebaseConnect, pathToJS, dataToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import MyHome from './MyHome';

//@firebaseConnect()
@connect(
    // Map state to props
    ({ firebase }) => ({
        profile: pathToJS(firebase, 'profile')
    })
)
export default class MyHomeParent extends React.Component {
    render() {
        const profile = this.props.profile;
        // handle initial loading of profile    
        if (!isLoaded(profile) || isEmpty(profile)) {
            return <View><Text>Loading...</Text></View>
        }

        return <MyHome profile={profile} />

    }
}
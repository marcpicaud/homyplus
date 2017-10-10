import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as styles from '../style';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';

@firebaseConnect()
@connect(
    // Map state to props
    ({ firebase }) => ({
        authError: pathToJS(firebase, 'authError'),
        auth: pathToJS(firebase, 'auth'),
        profile: pathToJS(firebase, 'profile')
    })
)
export default class PasswordReset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    handlePasswordReset() {
        this.props.firebase.auth()
            .sendPasswordResetEmail(this.state.email)
            .then(() => {alert('Email sent')})
            .catch((error) => {alert(error)});
    }

    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <FormLabel>Email</FormLabel>
                    <FormInput keyboardType='email-address' placeholder="test@email.com" onChangeText={(text) => this.setState({email:text})}></FormInput>
                </Card>
                <Button style={{marginTop:20}} title='Send me an email to reset my password' onPress={() => this.handlePasswordReset()} />
            </View>
        );
    }
}
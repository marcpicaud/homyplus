import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
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
export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirm: ''
        }
    }

    handleSignUp() {
        if (this.state.password !== this.state.passwordConfirm) {
            return alert('Your password and confirmation password don\'t match');
        }
        this.props.firebase.createUser(
            {email: this.state.email, password: this.state.password},
        ).then(() => this.props.navigation.navigate('signedInLayout'))
        .catch((error) => alert(error));
    }

    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <FormLabel>Email</FormLabel>
                    <FormInput onChangeText={(text) => this.setState({email: text})} keyboardType='email-address' placeholder="test@email.com"></FormInput>
                    <FormLabel>Password</FormLabel>
                    <FormInput onChangeText={(text) => this.setState({password: text})} secureTextEntry placeholder="Password"></FormInput>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormInput onChangeText={(text) => this.setState({passwordConfirm: text})} secureTextEntry placeholder="Password"></FormInput>
                </Card>
                <Button style={{marginTop:20}} title='Sign up' onPress={() => this.handleSignUp()} />
            </View>
        );
    }
}
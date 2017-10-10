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
export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'a@a.fr',
            password:'aaaaaaaa',
        }
    }

    /*
    * authentication logic 
    */
    handleLogin() {
        // try to login
        this.props.firebase.login({
            email: this.state.email,
            password: this.state.password
        }).then((user) => {
            // everything looks good
            this.props.navigation.navigate('signedInLayout');
        }).catch((error) => {
            // Something bad happened
            console.log(error);
            alert(error);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <FormLabel>Email</FormLabel>
                    <FormInput defaultValue="a@a.fr" placeholder="test@email.com" keyboardType='email-address' onChangeText={(text) => this.setState({email: text})}></FormInput>
                    <FormLabel>Password</FormLabel>
                    <FormInput defaultValue="aaaaaaaa" secureTextEntry placeholder="Password" onChangeText={(text) => this.setState({password: text})}></FormInput>
                </Card>
                <Button style={{marginTop:20}} title='Sign in' onPress={() => this.handleLogin() } />
                <Button style={{marginTop:20}} title='Create an account' onPress={() => this.props.navigation.navigate('signUp')} />
                <Button style={{marginTop:20}} title='Forgot Password?' onPress={() => this.props.navigation.navigate('passwordReset')} />
            </View>
        );
    }
}
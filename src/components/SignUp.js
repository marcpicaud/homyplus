import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import * as styles from '../style';
import { Card, FormLabel, FormInput, Button, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions/actionsCreators';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            username: ''
        }
    }

    handleSignUp() {
        if (this.state.password !== this.state.passwordConfirm) {
            return alert('Your password and confirmation password don\'t match');
        }
        if (!this.state.email) {
            return alert('Email cannot be null');
        }
        if (!this.state.password || !this.state.passwordConfirm) {
            return alert('Password cannot be null');
        }
        if (!this.state.username) {
            return alert('Username cannot be null');
        }

        // Dispatch the signup action to the store
        this.props.signup(this.state.email, this.state.password, this.state.username);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.currentUser) {
            // SignIn component will navigate to the actual app navigator
            // no need to this.props.navigation.navigate('signedInLayout');
        }

        if (nextProps.signupError) {
            alert(nextProps.signupError);
            this.props.unsetSignupError();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <Text style={{ textAlign: 'center' }}>Profile information</Text>
                    <Divider />
                    <FormLabel>Email</FormLabel>
                    <FormInput onChangeText={(text) => this.setState({email: text})} keyboardType='email-address' placeholder="test@email.com"></FormInput>
                    <FormLabel>Username</FormLabel>
                    <FormInput onChangeText={(text) => this.setState({username: text})} placeholder="etnaftw"></FormInput>
                    <FormLabel>Password</FormLabel>
                    <FormInput onChangeText={(text) => this.setState({password: text})} secureTextEntry placeholder="Password"></FormInput>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormInput onChangeText={(text) => this.setState({passwordConfirm: text})} secureTextEntry placeholder="Password"></FormInput>
                </Card>
                <Button style={{marginTop:20}} icon={{name: 'play-arrow'}} backgroundColor='#3D6DCC' title='Sign up' onPress={() => this.handleSignUp()} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        signupError: state.signupError
    }
}

export default connect(mapStateToProps, actions)(SignUp)
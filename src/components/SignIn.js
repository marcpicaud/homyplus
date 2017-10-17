import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as styles from '../style';
import { Card, FormLabel, FormInput, Button, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions/actionsCreators';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputEmail: 'a@a.fr',
            inputPassword: 'aaaaaaaa'
        }
    }

    handleLogin() {
        this.props.login(this.state.inputEmail, this.state.inputPassword);
    }

    componentWillUpdate(nextProps, nextState) {
        // TODO : Fix buggy behavior when login/logout multiple times
        if (nextProps.currentUser && !this.props.currentUser) {
            this.props.navigation.navigate('signedInLayout');
        }

        if (nextProps.loginError) {
            alert(nextProps.loginError);
            this.props.unsetLoginError();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <Text style={{ textAlign: 'center' }}>Please enter credentials</Text>
                    <Divider />
                    <FormLabel>Email</FormLabel>
                    <FormInput defaultValue="a@a.fr" placeholder="test@email.com" keyboardType='email-address' onChangeText={(text) => this.setState({inputEmail: text})}></FormInput>
                    <FormLabel>Password</FormLabel>
                    <FormInput defaultValue="aaaaaaaa" secureTextEntry placeholder="Password" onChangeText={(text) => this.setState({inputPassword: text})}></FormInput>
                </Card>
                <Button style={{marginTop:20}} icon={{name: 'play-arrow'}} backgroundColor='#3D6DCC' title='Sign in' onPress={() => this.handleLogin() } />
                <Button style={{marginTop:20}} icon={{name: 'account-circle'}} backgroundColor='#3D6DCC' title='Create an account' onPress={() => this.props.navigation.navigate('signUp')} />
                <Button style={{marginTop:20}} icon={{name: 'lock-open'}} backgroundColor='#3D6DCC' title='Forgot Password?' onPress={() => this.props.navigation.navigate('passwordReset')} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {currentUser: state.currentUser, loginError: state.loginError}
}

export default connect(mapStateToProps, actions)(SignIn);
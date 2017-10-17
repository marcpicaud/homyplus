import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as styles from '../style';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import * as actions from '../actions/actionsCreators';

class PasswordReset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    handlePasswordReset() {
        this.props.sendPasswordResetEmail(this.state.email);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps && nextProps.passwordResetStatus) {
            alert(nextProps.passwordResetStatus);
        }
        this.props.setPasswordResetStatus();
    }

    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <FormLabel>Email</FormLabel>
                    <FormInput keyboardType='email-address' placeholder="test@email.com" onChangeText={(text) => this.setState({email:text})}></FormInput>
                </Card>
                <Button style={{marginTop:20}} icon={{name: 'play-arrow'}} backgroundColor='#3D6DCC' title='Send me an email' onPress={() => this.handlePasswordReset()} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {passwordResetStatus: state.passwordResetStatus}
}

export default connect(mapStateToProps, actions)(PasswordReset)
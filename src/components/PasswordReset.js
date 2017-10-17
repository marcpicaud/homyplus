import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import * as styles from '../style';
import { Card, FormLabel, FormInput, Button, Divider } from 'react-native-elements';
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
        if (!this.state.email) {
            return alert('Email cannot be null');
        }

        // Dispatch password reset action
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
            <ScrollView style={styles.container}>
                <Card>
                    <Text style={{ textAlign: 'center' }}>Please enter email</Text>
                    <Divider />
                    <FormLabel>Email</FormLabel>
                    <FormInput keyboardType='email-address' placeholder="my@email.com" onChangeText={(text) => this.setState({email:text})}></FormInput>
                </Card>
                <Button style={{marginTop:20}} icon={{name: 'play-arrow'}} backgroundColor='#3D6DCC' title='Send me an email' onPress={() => this.handlePasswordReset()} />
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        passwordResetStatus: state.passwordResetStatus
    }
}

export default connect(mapStateToProps, actions)(PasswordReset)
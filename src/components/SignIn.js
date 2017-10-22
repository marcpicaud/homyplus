import React from 'react';
import { Text, View } from 'react-native';
import { Card, FormLabel, FormInput, Button, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as styles from '../style';
import * as actions from '../actions/actionsCreators';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: 'a@a.fr',
      inputPassword: 'aaaaaaaa',
    };
  }

  componentWillUpdate(nextProps) {
    // TODO : Fix buggy behavior when login/logout multiple times
    if (nextProps.currentUser && !this.props.currentUser) {
      this.props.navigation.navigate('signedInLayout');
    }

    if (nextProps.loginError) {
      alert(nextProps.loginError);
      this.props.unsetLoginError();
    }
  }

  handleLogin() {
    if (!this.state.inputEmail) {
      return alert('Email cannot be null');
    }
    if (!this.state.inputPassword) {
      return alert('Password cannot be null');
    }

    // Dispatch the login action to the store
    this.props.login(this.state.inputEmail, this.state.inputPassword);
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <Text style={{ textAlign: 'center' }}>Please enter credentials</Text>
          <Divider />
          <FormLabel>Email</FormLabel>
          <FormInput defaultValue="a@a.fr" placeholder="test@email.com" keyboardType="email-address" onChangeText={ text => this.setState({ inputEmail: text })} />
          <FormLabel>Password</FormLabel>
          <FormInput defaultValue="aaaaaaaa" secureTextEntry placeholder="Password" onChangeText={ text => this.setState({ inputPassword: text })} />
        </Card>
        <Button buttonStyle={{ marginTop: 20 }} icon={{ name: 'play-arrow' }} backgroundColor="#3D6DCC" title="Sign in" onPress={() => this.handleLogin()} />
        <Button buttonStyle={{ marginTop: 20 }} icon={{ name: 'account-circle' }} backgroundColor="#3D6DCC" title="Create an account" onPress={() => this.props.navigation.navigate('signUp')} />
        <Button buttonStyle={{ marginTop: 20 }} icon={{ name: 'lock-open' }} backgroundColor="#3D6DCC" title="Forgot Password?" onPress={() => this.props.navigation.navigate('passwordReset')} />
      </View>
    );
  }
}

SignIn.defaultProps = {
  currentUser: null,
  loginError: '',
  navigation: {},
  unsetLoginError: () => { alert('unsetLoginError function is not specified'); },
  login: () => { alert('login function is not specified'); },
};

SignIn.propTypes = {
  currentUser: PropTypes.object,
  loginError: PropTypes.string,
  navigation: PropTypes.object,
  unsetLoginError: PropTypes.func,
  login: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    loginError: state.loginError,
  };
}

export default connect(mapStateToProps, actions)(SignIn);

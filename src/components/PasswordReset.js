import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, FormLabel, FormInput, Button, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/actionsCreators';
import * as styles from '../style';

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps && nextProps.passwordResetStatus) {
      alert(nextProps.passwordResetStatus);
    }
    this.props.setPasswordResetStatus();
  }

  handlePasswordReset() {
    if (!this.state.email) {
      return alert('Email cannot be null');
    }

    // Dispatch password reset action
    this.props.sendPasswordResetEmail(this.state.email);
    return null;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Card>
          <Text style={{ textAlign: 'center' }}>Please enter email</Text>
          <Divider />
          <FormLabel>Email</FormLabel>
          <FormInput
            keyboardType="email-address"
            placeholder="my@email.com"
            onChangeText={ text => this.setState({ email: text })}
          />
        </Card>
        <Button
          style={{ marginTop: 20 }}
          icon={{ name: 'play-arrow' }}
          backgroundColor="#3D6DCC"
          title="Send me an email"
          onPress={() => this.handlePasswordReset()}
        />
      </ScrollView>
    );
  }
}

PasswordReset.defaultProps = {
  passwordResetStatus: '',
  sendPasswordResetEmail: () => { alert('sendPasswordResetEmail function is not specified '); },
  setPasswordResetStatus: () => { alert('setPasswordResetStatus function is not specified'); },
};

PasswordReset.propTypes = {
  passwordResetStatus: PropTypes.string,
  sendPasswordResetEmail: PropTypes.func,
  setPasswordResetStatus: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    passwordResetStatus: state.passwordResetStatus,
  };
}

export default connect(mapStateToProps, actions)(PasswordReset);

import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Header } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as actions from '../actions/actionsCreators';

class UserSettings extends React.Component {
  handleLogout() {
    this.props.logout();
    this.props.navigation.navigate('signedOutLayout');
  }

  render() {
    return (
      <View>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
          centerComponent={{ text: 'My Settings', style: { color: '#fff' } }}
        />
        <Button style={{ marginTop: 90 }} icon={{ name: 'lock-outline' }} backgroundColor='#3D6DCC' title="LOG OUT" onPress={() => this.handleLogout()} />
      </View>
    );
  }
}

UserSettings.defaultProps = {
  currentUser: null,
  navigation: null,
  logout: () => { alert('logout function is not specified'); },
};

UserSettings.propTypes = {
  currentUser: PropTypes.object,
  navigation: PropTypes.object,
  logout: PropTypes.func,
};

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, actions)(UserSettings);

import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Header } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Permissions, Notifications } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as actions from '../actions/actionsCreators';

class UserSettings extends React.Component {

  // Override router config.
  // TODO: Might be possible to use standard config.
  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarIcon: ({tintColor}) => (<MaterialCommunityIcons name='settings' size={26} color={ tintColor } />),
    showIcon: true,
  });

  handleLogout() {
    this.props.logout();
    this.props.navigation.navigate('signedOutLayout');
  }

  async enableNotifications() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    this.props.enableNotification(this.props.currentUser.uid, token);
  }

  render() {
    return (
      <View>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
          centerComponent={{ text: 'My Settings', style: { color: '#fff' } }}
        />
        <Button buttonStyle={{ marginTop: 90 }} icon={{ name: 'lock-outline' }} backgroundColor='#3D6DCC' title="LOG OUT" onPress={() => this.handleLogout()} />

        <Button buttonStyle={{ marginTop: 20 }} icon={{ name: 'add-alert' }} backgroundColor='#3D6DCC' title="Enable notifications" onPress={() => this.enableNotifications()} />
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

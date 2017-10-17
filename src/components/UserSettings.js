import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as styles from '../style';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import logoutAction from '../actions/actionsCreators';
import { firebaseConnect, pathToJS, dataToJS, isLoaded } from 'react-redux-firebase';
import { Card, FormLabel, FormInput, Button, Header } from 'react-native-elements';
import * as actions from '../actions/actionsCreators';

class UserSettings extends React.Component {
    handleLogout() {
        this.props.logout()
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
                <Button style={{marginTop:90}} icon={{name: 'lock-outline'}} backgroundColor='#3D6DCC' title="LOG OUT" onPress={() => this.handleLogout()} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {currentUser: state.currentUser}
}

export default connect(mapStateToProps, actions)(UserSettings)
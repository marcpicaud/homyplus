import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as styles from '../style';
import { connect } from 'react-redux';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Header, Text } from 'react-native-elements';
import * as actions from '../actions/actionsCreators';

class MyCalendar extends React.Component {

    render() {
        // Prop is not loaded yet
        if (this.props.home === undefined) {
            return (
                <View>
                    <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
                    centerComponent={{ text: 'Calendar', style: { color: '#fff' } }}
                    />
                    <ActivityIndicator size='large' style={{marginTop:130}} />
                </View>
            );
        }
        // User has a home
        if (this.props.home) {
            return (
                <View>
                    <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
                    centerComponent={{ text: 'Calendar', style: { color: '#fff' } }}
                    />
                </View>
            );
        }

        // User doesn't have a home
        return (
            <View>
                <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
                    centerComponent={{ text: 'Calendar', style: { color: '#fff' } }}
                />
                <Text h3 style={{marginTop:80}}>PLEASE JOIN A HOME OR CREATE ONE TO USE THE CALENDAR</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {home: state.home}
}

export default connect(mapStateToProps, actions)(MyCalendar);
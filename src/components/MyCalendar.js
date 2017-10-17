import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as styles from '../style';
import { connect } from 'react-redux';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Header, Text, Button } from 'react-native-elements';
import * as actions from '../actions/actionsCreators';

class MyCalendar extends React.Component {

    handleAddEvent() {
        this.props.navigation.navigate('addEvent')
    }

    render() {
        // Prop is not loaded yet
        if (this.props.home === undefined) {
            return (
                <View>
                    <ActivityIndicator size='large' style={{marginTop:130}} />
                </View>
            );
        }
        // User has a home
        if (this.props.home) {
            return (
                <View>
                <Text h3>USER HAS A HOME</Text>
                <Button title="Add event" icon={{name: "event"}} backgroundColor='#3D6DCC' style={{ marginTop: 20 }} onPress={() => this.handleAddEvent()} />
                </View>
            );
        }

        // User doesn't have a home
        return (
            <View>
                <Text h3>PLEASE JOIN A HOME OR CREATE ONE TO USE THE CALENDAR</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {home: state.home}
}

export default connect(mapStateToProps, actions)(MyCalendar);
import React from 'react';
import { ActivityIndicator, StyleSheet, KeyboardAvoidingView, ScrollView, DatePickerIOS } from 'react-native';
import * as styles from '../style';
import { connect } from 'react-redux';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Header, Text, CheckBox, Button, Card, Divider, FormLabel, FormInput } from 'react-native-elements';
import * as actions from '../actions/actionsCreators';

class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        //const now = new Date();
        this.state = {
            inputEventTitle: '',
            inputEventNotes: '',
            inputEventLocation: '',
            isPrivate: false,
            beginDate: new Date(),
            endDate: new Date()
        }
    }

    handleSearch(text) {
        console.log(text);
    }

    toggleGuest(guest) {
        this.setState({[guest]: this.state[guest] ? !this.state[guest] : true});
        console.log(this.state);
    }

    handleBeginDateChange(date) {
        this.setState({beginDate: date})
    }

    handleEndDateChange(date) {
        this.setState({endDate: date})
    }

    render() {
        console.log(this.state);
        return (
            <KeyboardAvoidingView behavior="position">
                <ScrollView>
                    <Card>
                        <FormLabel>Event Title</FormLabel>
                        <FormInput placeholder="veggie brunch" onChangeText={(text) => this.setState({ inputEventTitle: text })}></FormInput>
                        <FormLabel>Event Location</FormLabel>
                        <FormInput placeholder="At boby's" onChangeText={(text) => this.setState({ inputEventLocation: text })}></FormInput>
                        <FormLabel>Begin Date</FormLabel>
                        <DatePickerIOS
                            date={this.state.beginDate}
                            mode='datetime'
                            minuteInterval={5}
                            minimumDate={new Date()}
                            onDateChange={(date) => this.handleBeginDateChange(date)}
                        />
                        <FormLabel>End Date</FormLabel>
                        <DatePickerIOS
                            date={this.state.endDate}
                            mode='datetime'
                            minuteInterval={5}
                            minimumDate={new Date()}
                            onDateChange={(date) => this.handleEndDateChange(date)}
                        />
                        <FormLabel>Guests</FormLabel>
                        {
                            Object.keys(this.props.homeMembers).map((e, i) => (
                                <CheckBox
                                    key={e}
                                    title={this.props.homeMembers[e].username}
                                    checked={this.state[e] !== undefined ? this.state[e] : false}
                                    onPress={() => this.toggleGuest(e)}
                                />
                            ))
                        }
                        <FormLabel>Privacy</FormLabel>
                        <CheckBox
                            title='Hide to others'
                            checked={this.state.isPrivate}
                            onPress={() => this.setState({ isPrivate: !this.state.isPrivate })}
                        />
                        <FormLabel>Notes</FormLabel>
                        <FormInput onChangeText={(text) => this.setState({ inputEventNotes: text })}></FormInput>

                        <Button style={{ marginTop: 20 }} icon={{ name: "library-add" }} backgroundColor='#3D6DCC' title='Create' onPress={() => this.handleHomeCreation()} />
                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps(state) {
    return {
        home: state.home,
        homeMembers: state.homeMembers,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, actions)(AddEvent);
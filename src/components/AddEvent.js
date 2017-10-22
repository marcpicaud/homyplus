import React from 'react';
import { ActivityIndicator, StyleSheet, KeyboardAvoidingView, ScrollView, DatePickerIOS } from 'react-native';
import { connect } from 'react-redux';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Header, Text, CheckBox, Button, Card, Divider, FormLabel, FormInput } from 'react-native-elements';
import _ from 'lodash';
import DatePicker from 'react-native-datepicker'
import * as actions from '../actions/actionsCreators';

class AddEvent extends React.Component {
  static handleSearch(text) {
    console.log(text);
  }

  constructor(props) {
    super(props);
    // const now = new Date();
    this.state = {
      inputEventTitle: '',
      inputEventNotes: '',
      inputEventLocation: '',
      isPrivate: false,
      beginDate: new Date(),
      endDate: new Date(),
      guests: {},
    };
  }

  handleEventCreation() {
    if (!this.state.inputEventTitle) {
      return alert('Event Title must be specified');
    }
    if (!this.state.inputEventLocation) {
      return alert('Event location must be specified');
    }
    if (!this.state.beginDate) {
      return alert('Begin date must be specified');
    }
    if (!this.state.endDate) {
      return alert('End date must be specified');
    }

    this.props.createEvent(this.props.home.key, {
      title: this.state.inputEventTitle,
      location: this.state.inputEventLocation,
      beginDate: this.state.beginDate.toISOString(),
      endDate: this.state.endDate.toISOString(),
      notes: this.state.inputEventNotes,
      guests: this.state.guests,
      isPrivate: this.state.isPrivate,
    });

    return this.props.navigation.goBack();
  }

  toggleGuest(guest) {
    let guests = { ...this.state.guests };
    if (guests[guest]) {
      this.setState({ guests: _.omit(guests, guest) });
    } else {
      guests = { ...guests, [guest]: true };
      this.setState({ guests });
    }
  }

  handleBeginDateChange(date) {
    this.setState({ beginDate: new Date(date) });
  }

  handleEndDateChange(date) {
    this.setState({ endDate: new Date(date) });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="position">
        <ScrollView>
          <Card>
            <FormLabel>Event Title</FormLabel>
            <FormInput placeholder="veggie brunch" onChangeText={(text) => this.setState({ inputEventTitle: text })}></FormInput>
            <FormLabel>Event Location</FormLabel>
            <FormInput placeholder="At boby's" onChangeText={(text) => this.setState({ inputEventLocation: text })}></FormInput>
            <FormLabel>Begin Date</FormLabel>
            <DatePicker
            style={{width: 200}}
            date={this.state.beginDate}
            mode="datetime"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => this.handleBeginDateChange(date)} />
            <FormLabel>End Date</FormLabel>
            <DatePicker
            style={{width: 200}}
            date={this.state.endDate}
            mode="datetime"
            minDate={this.state.beginDate}
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => this.handleEndDateChange(date)} />
            <FormLabel>Guests</FormLabel>
            {
              Object.keys(this.props.homeMembers).map((e, i) => (
                <CheckBox
                  key={e}
                  title={this.props.currentUser.uid == e ? this.props.homeMembers[e].username + ' (me)' : this.props.homeMembers[e].username}
                  checked={this.state.guests[e] !== undefined ? this.state.guests[e] : false}
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

            <Button style={{ marginTop: 20 }} icon={{ name: "library-add" }} backgroundColor='#3D6DCC' title='Create' onPress={() => this.handleEventCreation()} />
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
    currentUser: state.currentUser,
    events: state.homeEvents,
  };
}

export default connect(mapStateToProps, actions)(AddEvent);

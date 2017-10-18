import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import { Text, Button, List, ListItem } from 'react-native-elements';
import * as actions from '../actions/actionsCreators';

class MyCalendar extends React.Component {

  handleAddEvent() {
    this.props.navigation.navigate('addEvent');
  }

  formatHomeEventForDisplay(event) {
    const timestamp = Date.parse(event.beginDate);
    const date = new Date(timestamp).toLocaleDateString();
    return event.title + ' ' + date;
  }

  render() {
    // Prop is not loaded yet
    if (this.props.home === undefined || this.props.homeEvents === undefined) {
      return (
        <View>
          <ActivityIndicator size='large' style={{ marginTop: 130 }} />
        </View>
      );
    }
    // User has a home
    if (this.props.home) {
      return (
        <View>
          <Button title="Add event" icon={{ name: 'event' }} backgroundColor="#3D6DCC" style={{ marginTop: 10 }} onPress={() => this.handleAddEvent()} />
          <List containerStyle={{ marginBottom: 20 }}>
          {
            Object.keys(this.props.homeEvents).map((e, i) => (
              <ListItem
                key={i}
                title={this.formatHomeEventForDisplay(this.props.homeEvents[e])}
                hideChevron={true}
              />
            ))
          }
        </List>
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
  return {
    home: state.home,
    homeEvents: state.homeEvents,
  };
}

export default connect(mapStateToProps, actions)(MyCalendar);

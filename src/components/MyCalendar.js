import React from 'react';
import { ActivityIndicator, View , StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { Text, Button, List, ListItem } from 'react-native-elements';
import { Agenda } from 'react-native-calendars';

import * as actions from '../actions/actionsCreators';

class MyCalendar extends React.Component {

  // Override router config to add a button on headerRight.
  // TODO: Might be possible to use standard config.
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerRight: <Button title="Add" icon={{ name: 'add' }} backgroundColor="#3D6DCC" onPress={() => navigation.navigate('addEvent')} />,
  });

  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    // Props haven't changed
    if (this.props.homeEvents == nextProps.homeEvents) {
      return;
    }

    // homeEvents is not loaded yet
    if (!nextProps.homeEvents) {
      return;
    }

    // Loops through firebase data and build the inner state accordingly
    const items = {}
    Object.keys(nextProps.homeEvents).forEach((key, index) => {
      const currentEvent = nextProps.homeEvents[key];
      const currentEventTime = this.timeToString(currentEvent.beginDate)
  
      if (!items[currentEventTime]) {
        items[currentEventTime] = [];
      }
      items[currentEventTime].push(currentEvent);
    });

    // Init 'today' as empty item if there is no event planned
    const today = this.timeToString(new Date().getTime());
    items[today] = items[today] ? items[today] : [];

    this.setState({items});
  }

  // What happens when the user taps "Add Event"
  handleAddEvent() {
    this.props.navigation.navigate('addEvent');
  }

  handleDayPressed(day) {
    // Force the agenda to display the selected day as emtpy
    // if there is no event in db
    if (!this.state.items[day.dateString]) {
      this.state.items[day.dateString] = [];
    }
  }
  
  // Triggered when a month is loaded
  loadItems(calendarObject) {
    console.log('loadItems:', calendarObject);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>Nothing to show for this day.</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.title !== r2.title;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  render() {
    // Props are not loaded yet
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
        <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            selected={new Date().toString()}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            onDayPress={(day) => {this.handleDayPressed(day)}}
            //markingType={'interactive'}
            //markedDates={'2017-10': []}
            //  '2017-05-08': [{textColor: '#666'}],
            //  '2017-05-09': [{textColor: '#666'}],
            //  '2017-05-14': [{startingDay: true, color: 'blue'}, {endingDay: true, color: 'blue'}],
            //  '2017-05-21': [{startingDay: true, color: 'blue'}],
            //  '2017-05-22': [{endingDay: true, color: 'gray'}],
            //  '2017-05-24': [{startingDay: true, color: 'gray'}],
            //  '2017-05-25': [{color: 'gray'}],
            //  '2017-05-26': [{endingDay: true, color: 'gray'}]}}
            // monthFormat={'yyyy'}
            // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
            //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          />
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
    items: state.items,
  };
}

const styles = StyleSheet.create({
      item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
      },
      emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
      }
});

export default connect(mapStateToProps, actions)(MyCalendar);

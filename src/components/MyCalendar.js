import React from 'react';
import { ActivityIndicator, View , StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { Text, Button, List, ListItem } from 'react-native-elements';
import { Agenda } from 'react-native-calendars';

import * as actions from '../actions/actionsCreators';

class MyCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  handleAddEvent() {
    this.props.navigation.navigate('addEvent');
  }

  formatHomeEventForDisplay(event) {
    const timestamp = Date.parse(event.beginDate);
    const date = new Date(timestamp).toLocaleDateString();
    return event.title + ' ' + date;
  }

  loadItems(day) {
       // setTimeout(() => {
       //      this.setState({
       //          items: {
       //          '2017-05-22': [{text: 'item 1 - any js object', name: "test", }],
       //          '2017-05-23': [{text: 'item 2 - any js object'}],
       //          '2017-05-24': [],
       //          '2017-05-25': [{text: 'item 3 - any js object'},{text: 'any js object'}],
       //      }
       //      });
       //  }, 1000);
       // Object.keys(this.props.homeEvents).map((e, i) => {
       //      console.log("i is:", this.props.homeEvents[e]);
       //      console.log("e is:", e);
       // });
       const newItems = {};
       let tmp = []
      Object.keys(this.props.homeEvents).forEach((key, i) => {
        tmp.push(this.props.homeEvents[key])
        newItems[this.timeToString(this.props.homeEvents[key].beginDate)] = tmp;
      });

      this.setState({
        items: newItems
      });
      console.log("new items is: ", this.props.homeEvents)

        //console.log(`Load Items for ${day.timestamp}-${day.month}`);
      }

      renderItem(item) {
        return (
          <View style={[styles.item, {height: item.height}]}>
            <Text>{item.title}</Text>
            <Text>{item.text}</Text>
          </View>
        );
      }

      renderEmptyDate() {
        return (
          <View style={styles.emptyDate}><Text>This is empty date!</Text><Button title="Add event" icon={{ name: 'event' }} backgroundColor="#3D6DCC" style={{ marginTop: 10 }} onPress={() => this.handleAddEvent()} /></View>
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
        <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            selected={new Date().toString()}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
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

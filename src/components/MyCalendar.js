import * as actions from '../actions/actionsCreators';

import React, { Component } from 'react'
import {View, StyleSheet,Text} from 'react-native'

import { Agenda } from 'react-native-calendars';

export default class MyCalendar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        };
    }
    
    render() {
        this.state = {};
        this.date = new Date().toString()
        return (
          <Agenda
            //items={this.state.items}
            items = {{
                '2017-10-23': [{text: 'item 1 - any js object', name: "test", }],
                '2017-10-22': [{text: 'item 2 - any js object'}],
                '2017-10-24': [],
                '2017-10-25': [{text: 'item 3 - any js object'},{text: 'any js object'}],
            }}
            loadItemsForMonth={this.loadItems.bind(this)}
            selected={new Date().toString()}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            //markingType={'interactive'}
            //markedDates={{
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

    loadItems(day) {
       setTimeout(() => {
            this.setState({
                items: {
                '2017-05-22': [{text: 'item 1 - any js object', name: "test", }],
                '2017-05-23': [{text: 'item 2 - any js object'}],
                '2017-05-24': [],
                '2017-05-25': [{text: 'item 3 - any js object'},{text: 'any js object'}],
            }
            });
        }, 1000);
        //console.log(`Load Items for ${day.timestamp}-${day.month}`);
      }

      renderItem(item) {
        return (
          <View style={[styles.item, {height: item.height}]}>
            <Text>{item.name}</Text>
            <Text>{item.text}</Text>

          </View>
        );
      }

      renderEmptyDate() {
        return (
          <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
      }

      rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
      }

      timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
      }
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
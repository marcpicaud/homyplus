import { StackNavigator, TabNavigator } from 'react-navigation';

import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import MyCalendar from '../components/MyCalendar';
import UserSettings from '../components/UserSettings';
import MyHome from '../components/MyHome';
import AddEvent from '../components/AddEvent';
import PasswordReset from '../components/PasswordReset';

const SignedOutLayout = StackNavigator({
  signIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#3D6DCC' },
    },
  },
  signUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Sign Up',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#3D6DCC' },
    },
  },
  passwordReset: {
    screen: PasswordReset,
    navigationOptions: {
      title: 'Password recovery',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#3D6DCC' },
    },
  },
});

const CalendarNavigator = StackNavigator({
  calendar: {
    screen: MyCalendar,
    navigationOptions: {
      title: 'My Calendar',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#3D6DCC' },
    },
  },
  addEvent: {
    screen: AddEvent,
    navigationOptions: {
      title: 'Add Event',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#3D6DCC' },
    },
  },
});

const SignedInLayout = TabNavigator({
  calendar: {
    screen: CalendarNavigator,
  },
  myHome: {
    screen: MyHome,
    navigationOptions: {
      title: 'My Home',
    },
  },
  settings: {
    screen: UserSettings,
    navigationOptions: {
      tabBarLabel: 'Settings',
    },
  },
}, {tabBarPosition: 'bottom'});

export default StackNavigator({
  signedInLayout: { screen: SignedInLayout },
  signedOutLayout: { screen: SignedOutLayout },
}, {
  initialRouteName: 'signedOutLayout',
  headerMode: 'none',
});


import { React } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons';

import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import MyCalendar from '../components/MyCalendar';
import UserSettings from '../components/UserSettings';
import MyHome from '../components/MyHome';
import PasswordReset from '../components/PasswordReset';

const SignedOutLayout = StackNavigator({
  signIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In",
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#3D6DCC' },
    }
  },
  signUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up",
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#3D6DCC' },
    }
  },
  passwordReset: {
    screen: PasswordReset,
    navigationOptions: {
      title: "Password recovery",
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#3D6DCC' },
    }
  }
});

const SignedInLayout = TabNavigator({
  calendar: {
    screen: MyCalendar,
    navigationOptions: {
      tabBarLabel: "Calendar"
    }
  },
  myHome: {
    screen: MyHome,
    navigationOptions: {
      title: "My Home",
    }
  },
  settings: {
    screen: UserSettings,
    navigationOptions: {
      tabBarLabel: "Settings"
    }
  }
}, {});

export const createAppNavigator = (isSignedIn = false) => {
  return StackNavigator({
      signedInLayout: { screen: SignedInLayout },
      signedOutLayout: { screen: SignedOutLayout }
    },{
      initialRouteName: 'signedOutLayout',
      mode: 'modal',
      headerMode: 'none'
    });
}
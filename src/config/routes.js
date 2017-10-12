import { React } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Calendar from '../components/Calendar';
import UserSettings from '../components/UserSettings';
import MyHomeParent from '../components/MyHomeParent';
//import MyHome from '../components/MyHome';
import PasswordReset from '../components/PasswordReset';

const SignedOutLayout = StackNavigator({
  signIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In"
    }
  },
  signUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up"
    }
  },
  passwordReset: {
    screen: PasswordReset,
    navigationOptions: {
      title: "Password recovery"
    }
  }
});

const SignedInLayout = TabNavigator({
  calendar: {
    screen: Calendar,
    navigationOptions: {
      title: "Calendar"
    }
  },
  myHome: {
    screen: MyHomeParent,
    navigationOptions: {
      title: "My Home"
    }
  },
  settings: {
    screen: UserSettings,
    navigationOptions: {
      title: "Settings"
    }
  }
});

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
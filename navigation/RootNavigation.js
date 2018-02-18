import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import MainDrawerNavigator from './MainDrawerNavigator';
import GuideScreen from '../screens/GuideScreen';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import ReceiveScreen from '../screens/ReceiveScreen';
import SendScreen from '../screens/SendScreen';
import ChartScreen from '../screens/ChartScreen';
import DocumentScreen from '../screens/DocumentScreen';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: GuideScreen,
      // screen: ChartScreen,
      // screen: SendScreen,
      // screen: ReceiveScreen,
    },
    Landing: {
      screen: MainDrawerNavigator
    },
    Camera: {
      screen: CameraScreen
    },
    Docs: {
      screen: DocumentScreen 
    },
    Receive: {
      screen: ReceiveScreen
    },
    Send: {
      screen: SendScreen
    },
    Chart: {
      screen: ChartScreen
    }
  },
  {
    navigationOptions: () => ({
      header: null
    }),
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}

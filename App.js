import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import firebase from 'firebase';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
          <RootNavigation />
        </View>
      );
    }
  }

  componentDidMount() {
    var config = {
      apiKey: "AIzaSyAqQPd5fSlmnOUbOUK7dRVRu9LUu07-Wuo",
      authDomain: "mediblock-195521.firebaseapp.com",
      databaseURL: "https://mediblock-195521.firebaseio.com",
      projectId: "mediblock-195521",
      storageBucket: "mediblock-195521.appspot.com",
      messagingSenderId: "20010659986"
    };
    firebase.initializeApp(config);
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
        require('./assets/images/overlay.png'),
        require('./assets/images/icons8-menu_filled.png'),
        require('./assets/images/mbcoin.png'),
        require('./assets/images/bill.png'),
        require('./assets/images/icons8-document.png'),
        require('./assets/images/icons8-menu_filled_blue.png'),
        require('./assets/images/icons8-donate.png'),
        require('./assets/images/icons8-receive_cash.png'),
        require('./assets/images/icons8-camera.png'),

      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

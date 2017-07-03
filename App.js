import React from 'react';
import { Font, AppLoading } from 'expo';
import firebase from 'firebase';
import Navigator from './containers/Navigator';
import fbConfig from './config/firebase';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isReady: false,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
    });
    firebase.initializeApp(fbConfig);
    this.setState({isReady: true});
  }

  render() {
     if (!this.state.isReady) {
      return <AppLoading />;
    }
    
    return (
      <Navigator/>
    );
  }
}

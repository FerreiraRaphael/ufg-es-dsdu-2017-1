import React from 'react';
import Navigator from './containers/Navigator'
import { Font, AppLoading } from 'expo';

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

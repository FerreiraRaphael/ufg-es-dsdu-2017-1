import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  H3,
  Form
} from "native-base";
import { StyleSheet, View } from "react-native";
import { Constants, MapView,LinearGradient } from "expo";
import SignInContainer from '../../containers/SignIn';


const styles = {
  container: {
    paddingTop: Constants.statusBarHeight
  }
};

class SignInScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={['#3a7bd5', '#00d2ff']}
          style={{
            flex: 1, width: '100%', alignItems: 'center',
            justifyContent: 'center'

          }} >
          <SignInContainer navigation={this.props.navigation} />
        </LinearGradient>



      </Container>
    );
  }
}

export default SignInScreen;

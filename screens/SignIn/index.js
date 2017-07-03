import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  H3,
  Form
} from "native-base";
import { StyleSheet, View } from "react-native";
import { Constants, MapView } from "expo";
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
        <Content padder>
          <H3>This is SignIn section</H3>
          <SignInContainer/>
        </Content>
      </Container>
    );
  }
}

export default SignInScreen;

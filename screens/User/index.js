import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  H3,
} from "native-base";
import { StyleSheet, View } from "react-native";
import { Constants, MapView } from "expo";

const styles = {
  container: {
    paddingTop: Constants.statusBarHeight
  }
};

class UserScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <H3>This is User section</H3>
        </Content>
      </Container>
    );
  }
}

export default UserScreen;

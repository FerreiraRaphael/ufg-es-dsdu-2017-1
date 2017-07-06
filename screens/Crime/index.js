import React, { Component } from "react";
import { Container, Content, Text, H3, Form, Header, Left, Button, Icon, Item, Label, Input } from "native-base";
import { StyleSheet, View , Platform } from "react-native";
import { Constants, MapView, LinearGradient } from "expo";
import CrimeForm from '../../containers/CrimeForm';

const styles = {
  container: {
    paddingTop:  Platform.OS === "ios" ? 0 : Constants.statusBarHeight
  }
};

class CrimeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        description: '',
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack(null)}
            >
              <Icon name="ios-arrow-back" />
              <Text style={{ marginLeft: 10 }}>Registrar Ocorência</Text>
            </Button>
          </Left>
        </Header>
        <CrimeForm navigation={this.props.navigation}/>
      </Container>
    );
  }
}

export default CrimeScreen;

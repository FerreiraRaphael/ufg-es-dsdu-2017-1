import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Button,
  Fab,
  Icon,
  Input,
  Item,
  Header,
  H3
} from "native-base";
import { StyleSheet, View } from "react-native";
import firebase from "firebase";
import Map from "../../containers/Map";
import styles from "./styles";

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationResult: false
    };
  }

  componentDidMount() {
    debugger;
  }

  _goToSearch() {
    let location = this.state.locationResult;
    let params = {};
    if (location) {
      let { latitude, longitude } = this.state.locationResult.coords;
      params = Object.assign({}, params, { latitude, longitude });
    }
    this.props.navigation.navigate("Search", params);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded style={{ backgroundColor: "#fff" }}>
          <Item>
            <Icon name="ios-search" />
            <Input onFocus={() => this._goToSearch()} placeholder="Pesquisar" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Buscar</Text>
          </Button>
        </Header>
        <Content>
          <Map
            navigation={this.props.navigation}
            onLocationChange={locationResult => {
              this.setState({ locationResult });
            }}
            locationResult={this.state.locationResult}
          />
        </Content>
      </Container>
    );
  }
}

export default MapScreen;

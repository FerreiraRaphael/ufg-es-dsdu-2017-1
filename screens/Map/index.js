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
      locationResult: false,
      mapRegion: {
        latitude: -16.6815803,
        longitude: -49.258389,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0021
      },
      searchResult: false
    };
  }

  componentDidMount() {
    let params = this.props.navigation.state.params;
    if (!params) return;
    let mapRegion = Object.assign({}, this.state.mapRegion, params);
    let searchResult = true;
    this.setState({ mapRegion, searchResult });
  }

  _goToSearch() {
    let location = this.state.locationResult;
    let params = {};
    if (location) {
      let { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.locationResult.coords;
      params = Object.assign({}, params, { latitude, longitude, latitudeDelta, longitudeDelta });
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
        <Map
          navigation={this.props.navigation}
          onLocationChange={locationResult => {
            this.setState({ locationResult });
          }}
          locationResult={this.state.locationResult}
          mapRegion={this.state.mapRegion}
          onMapRegionChange={mapRegion => { this.setState({ mapRegion }) }}
          searchResult={this.state.searchResult}
        />
      </Container>
    );
  }
}

export default MapScreen;

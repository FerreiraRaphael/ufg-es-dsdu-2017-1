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
  H3,
  List,
  Right,
  ListItem
} from "native-base";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import firebase from "firebase";
import Map from "../../containers/Map";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { searchAddress, getAddress } from "../../services/maps";

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      results: [],
      latitude: null,
      longitude: null
    };
  }

  async _handleSearchChange(event) {
    let text = event.nativeEvent.text;
    this.setState({ loading: true });

    let { results } = await searchAddress(text);
    this.setState({ results, loading: false });
  }

  async componentDidMount() {
    this.setState({ loading: true });
    let { latitude, longitude } = this.props.navigation.state.params;
    let {results} = await getAddress({ latitude, longitude });
    this.setState({ latitude, longitude, results, loading: false });
  }

  _handleItemPress(result) {
    this.props.navigation.navigate("Map", {
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng
    });
  }

  _renderResultList() {
    if (this.state.loading) return <ActivityIndicator />;

    return (
      <List>
        <ListItem itemHeader first>
          <Text>Resultados</Text>
        </ListItem>
        {this.state.results.map(result => {
          return (
            <ListItem
              key={result.place_id}
              onPress={() => this._handleItemPress(result)}
            >
              <Text numberOfLines={2}>{result.formatted_address}</Text>
            </ListItem>
          );
        })}
      </List>
    );
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded style={styles.header}>
          <Item>
            <Icon name="ios-search" />
            <Input
              autoFocus
              placeholder="Pesquisar"
              onSubmitEditing={event => this._handleSearchChange(event)}
            />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Buscar</Text>
          </Button>
        </Header>
        <Content padder>
          {this._renderResultList()}
        </Content>
      </Container>
    );
  }
}

export default SearchScreen;

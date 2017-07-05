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
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';
import Map from '../../containers/Map';
import styles from './styles';

class MapScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Pesquisar" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Buscar</Text>
          </Button>
        </Header>
        <Content padder>
          <Map navigation={this.props.navigation}/>
        </Content>
      </Container>
    );
  }
}

export default MapScreen;

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
} from "native-base";
import { StyleSheet, View } from 'react-native';
import { Constants } from "expo";
import Map from '../../containers/Map';

const styles = {
  container: {
    paddingTop: Constants.statusBarHeight,
    marginBottom: 5
  }, 
  map: {
    flex: 1,
    marginBottom: 100
  },
  actionButton: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 147,
    justifyContent: 'center', alignItems: 'center'
  },
  button: {
    width: 40
  }
};

class MapScreen extends Component {
  constructor(props) {
    super(props);
  }

  handleMainButtonClick (navigator){
    this.props.navigation.navigate('SignIn');
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content padder>
          <H3>This is Map section</H3>

          <Map />
          <View style={styles.actionButton}>
            <Button
              full success
              onPress={() => this.handleMainButtonClick()}>
              <Text>Entrar</Text>
            </Button>
          </View>
          <Fab
            containerStyle={{}}
            style={{
              backgroundColor: '#5067FF',
              bottom: 200,
              left: -15
            }}
            position="bottomLeft"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="locate" />
          </Fab>
        </Content>
      </Container>
    );
  }
}

export default MapScreen;

import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Button,
  Header,
  H3,
  List,
  ListItem,
  Right,
  Item,
  Icon,Input
} from "native-base";
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from "expo";

const styles = {
  container: {
    paddingTop: 0,
    marginBottom: 0
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  text: {
    marginRight: 20
  }
};

class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      locationResult: false,
      mapRegion: {
        latitude: -16.6815803,
        longitude: -49.258389,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      crimes: [],
      aim: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => this._handleUserAuth(user));
  }

  _handleUserAuth(user) {
    if (user) {
      let { uid } = user
      user = { uid };
    }
    this.setState({ user });
  }

  async _handleLogout() {
    await firebase.auth().signOut();
    this.props.navigation.goBack(null);
  }

  _handleMainButtonClick() {
    this.props.navigation.navigate('SignIn');
    return;
  }

  render() {
    if (!this.state.user) {
      return (
      <Container style={styles.container}>
        <Header>
          <Item>
            <H3 style={{ color: '#000' }}>Usuário</H3>
          </Item>
        </Header>
        <Content padder>
          <Text style={styles.paragraph}>
            Atenção! Para ver os crimes cadastrados por você
            é necessário estar logado.
          </Text>
          <Button full success style={{ marginBottom: 10 }}
            onPress={() => this._handleMainButtonClick()}>
            <Text style={styles.text}>LOGAR-SE</Text>
            <Ionicons name="ios-log-in" size={32} color="#fff" />
          </Button>
        </Content>
      </Container>
      );
    } else {
    return (
      <Container style={styles.container}>
        <Header>
          <Item>
            <H3 style={{ color: '#000' }}>Usuário</H3>
          </Item>
        </Header>
        <Content padder>
          <List>
            <ListItem itemHeader first>
              <Text>Suas Ocorrências</Text>
            </ListItem>
            <ListItem >
              <Text>Hangover</Text>
              <Right>
                <Ionicons name="ios-trash-outline" size={32} />
              </Right>
            </ListItem>
          </List>
          <Button full danger style={{ marginBottom: 10 }}
            onPress={() => this._handleLogout()}>
            <Text>SAIR</Text>
          </Button>
        </Content>
      </Container>
    );
    }
  }
}

export default UserScreen;

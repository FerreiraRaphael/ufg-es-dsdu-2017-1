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
  Item
} from "native-base";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import { Constants } from "expo";
import { Platform } from 'react-native';
import UserList from "../../containers/UserList";

const styles = {
  container: {
    paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    marginBottom: 5,
  },
  header: {
    backgroundColor: '#fff'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
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
      userList: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this._handleUserAuth(user));
  }

  _handleUserAuth(user) {
    if (user) {
      let { uid } = user;
      user = { uid };
      firebase
        .database()
        .ref("crimes")
        .orderByChild("userId")
        .equalTo(uid)
        .on("value", snap => {
          let userList = snap.val();
          this.setState({ userList });
        });
    }
    this.setState({ user });
  }

  async _handleLogout() {
    await firebase.auth().signOut();
    this.props.navigation.goBack(null);
  }

  _handleMainButtonClick() {
    this.props.navigation.navigate("SignIn");
  }

  render() {
    if (!this.state.user) {
      return (
        <Container style={styles.container}>
          <Header style={styles.header}>
            <Item>
              <H3 style={{ color: "#000" }}>Usuário</H3>
            </Item>
          </Header>
          <Content padder>
            <Text style={styles.paragraph}>
              Atenção! Para ver os crimes cadastrados por você
              é necessário estar logado.
            </Text>
            <Button
              full
              success
              style={{ marginBottom: 10 }}
              onPress={() => this._handleMainButtonClick()}
            >
              <Text style={styles.text}>LOGAR-SE</Text>
              <Ionicons name="ios-log-in" size={32} color="#fff" />
            </Button>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container style={styles.container}>
          <Header style={styles.header}>
            <Item>
              <H3 style={{ color: "#000" }}>Usuário</H3>
            </Item>
          </Header>
          <UserList userList={this.state.userList} navigation={this.props.navigation}/>
          <Button
            full
            danger
            style={{ marginBottom: 10 }}
            onPress={() => this._handleLogout()}
          >
            <Text>SAIR</Text>
          </Button>
        </Container>
      );
    }
  }
}

export default UserScreen;

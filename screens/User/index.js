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
  Right
} from "native-base";
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from "expo";

const styles = {
  container: {
    paddingTop: Constants.statusBarHeight,
    marginBottom: 10
  }
};

class UserScreen extends Component {
  constructor(props) {
    super(props);
  }

  async _handleLogout() {
    await firebase.auth().signOut();
    this.props.navigation.goBack(null);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{
          paddingTop: 15,
        }}>
          <H3 style={{ color: '#fff' }}>Usuário</H3>
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
            <ListItem >
              <Text>Hangover</Text>
              <Right>
                <Ionicons name="ios-trash-outline" size={32} />
              </Right>
            </ListItem>
            <ListItem >
              <Text>Hangover</Text>
              <Right>
                <Ionicons name="ios-trash-outline" size={32} />
              </Right>
            </ListItem>
            <ListItem >
              <Text>Hangover</Text>
              <Right>
                <Ionicons name="ios-trash-outline" size={32} />
              </Right>
            </ListItem>
            <ListItem >
              <Text>Hangover</Text>
              <Right>
                <Ionicons name="ios-trash-outline" size={32} />
              </Right>
            </ListItem>
            <ListItem >
              <Text>Hangover</Text>
              <Right>
                <Ionicons name="ios-trash-outline" size={32} />
              </Right>
            </ListItem>
            <ListItem >
              <Text>Hangover</Text>
              <Right>
                <Ionicons name="ios-trash-outline" size={32} />
              </Right>
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

export default UserScreen;

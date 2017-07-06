import React, { Component } from "react";
import {
  Text,
  List,
  ListItem,
  Right,
  Button,
  H3,
  Container,
  Content
} from "native-base";
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import { Constants } from "expo";
import { Platform } from 'react-native';

const styles = {
  container: {
    paddingTop: Constants.statusBarHeight
  }
};

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      address: "",
      userId: "",
      latitude: "",
      longitude: ""
    };
  }

  async _deleteCrime(key) {
    await firebase.database().ref(`crimes/${key}`).remove();
  }

  render() {
    let { userList } = this.props;
    let keys = Object.keys(userList || {});
    return (
      <Content>
        <List>
          <ListItem itemHeader first>
            <Text>Suas Ocorrências</Text>
          </ListItem>
          {keys.map(key => {
            let crime = userList[key];
            return (
              <ListItem
                key={key}
              >
                <Text numberOfLines={1}>{crime.title}</Text>
                <Right>
                  <Button transparent onPress={() => this._deleteCrime(key)}>
                    <Ionicons name="ios-trash-outline" size={32} />
                  </Button>
                </Right>
              </ListItem>
            );
          })}
        </List>
      </Content>
    );
  }
}

export default UserList;

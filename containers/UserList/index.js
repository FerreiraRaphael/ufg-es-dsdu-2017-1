import React, { Component } from "react";
import {
  Text,
  List,
  ListItem,
  Right
} from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { Constants } from "expo";
import firebase from 'firebase';

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


  render() {
    return (
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
    );
  }
}

export default UserList;

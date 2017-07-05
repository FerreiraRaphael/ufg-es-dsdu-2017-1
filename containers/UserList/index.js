import React, { Component } from "react";
import {
  Text,
  List,
  ListItem,
  Right,
  Button
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

  async _deleteCrime(key) {
    await firebase.database().ref(`crime/${key}`).remove();
  }

  render() {
    let { userList } = this.props;
    let keys = Object.keys(userList);
    return (
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
              <Text>{crime.title}</Text>
              <Text numberOfLines={2}>{crime.description}</Text>
              <Right>
                <Button transparent onPress={() => this._deleteCrime(key)}>
                  <Ionicons name="ios-trash-outline" size={32} />
                </Button>
              </Right>
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export default UserList;

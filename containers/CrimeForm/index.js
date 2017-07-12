import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  H3,
  Form,
  Header,
  Left,
  Button,
  Icon,
  Item,
  Label,
  Input,
  Textarea,
  List,
  ListItem,
  InputGroup
} from "native-base";
import { StyleSheet, View, TextInput, ActivityIndicator } from "react-native";
import { Constants, MapView, LinearGradient } from "expo";
import firebase from 'firebase';
import { getAddress } from "../../services/maps";

const styles = {
  container: {
    paddingTop: Constants.statusBarHeight
  }
};

class CrimeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      address: "",
      userId: "",
      latitude: "",
      longitude: "", 
      latitudeDelta: "", 
      longitudeDelta: "" 
    };
  }

  async componentDidMount() {
    let { userId, latitude, longitude, latitudeDelta, longitudeDelta  } = this.props.navigation.state.params;
    let googleResults = await getAddress({ latitude, longitude, latitudeDelta, longitudeDelta  });

    let address = googleResults.results[0].formatted_address;
    this.setState({ userId, address, latitude, longitude, latitudeDelta, longitudeDelta, ready: true });
  }

  async _handleSaveClick() {
    let key = firebase.database().ref("crimes").push().key;

    firebase.database().ref("crimes/" + key).set(this.state);
    this.props.navigation.goBack(null);
  }

  render() {
    if (!this.state.ready) return <ActivityIndicator size="large" />;
    return (
      <List>
        <ListItem>
          <InputGroup>
            <Input stackedLabel label="Título" placeholder="Título"
              onChange={e => {
                this.setState({title: e.nativeEvent.text});
              }}
              value={this.state.title} />
          </InputGroup>
        </ListItem>
        <ListItem>
          <InputGroup>
            <Input stackedLabel label="Descrição" placeholder="Descrição"
              onChange={e => {
                this.setState({description: e.nativeEvent.text});
              }}
              value={this.state.description} />
          </InputGroup>
        </ListItem>
        <ListItem>
          <InputGroup>
            <Input stackedLabel label="Endereço" placeholder="Endereço"
              onChange={e => {
                this.setState({address: e.nativeEvent.text});
              }}
              value={this.state.address} />
          </InputGroup>
        </ListItem>
        <ListItem>
          <Button full success
            onPress={() => this._handleSaveClick()}
          >
            <Text>Salvar</Text>
          </Button>
        </ListItem>
      </List>
    );
  }
}

export default CrimeForm;

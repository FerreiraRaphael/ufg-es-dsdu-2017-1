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
  Textarea
} from "native-base";
import { StyleSheet, View, TextInput, ActivityIndicator } from "react-native";
import { Constants, MapView, LinearGradient } from "expo";
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
      longitude: ""
    };
  }

  async componentDidMount() {
    debugger;
    let { userId, latitude, longitude } = this.props.navigation.state.params;
    let googleResults = await getAddress({ latitude, longitude });

    let address = googleResults.results[0].formatted_address;
    this.setState({ userId, address, latitude, longitude, ready: true });
  }

  render() {
    if (!this.state.ready) return <ActivityIndicator size="large" />;
    return (
      <Form>
        <Item stackedLabel>
          <Label>Título</Label>
          <Input
            onChange={title => {
              this.setState(title);
            }}
            value={this.state.title}
          />
        </Item>
        <Item stackedLabel>
          <Label>Descrição</Label>
          <Input
            onChange={description => {
              this.setState(description);
            }}
            value={this.state.description}
          />
        </Item>
        <Item stackedLabel>
          <Label>Endereço</Label>
          <Input
            onChange={address => {
              this.setState(address);
            }}
            value={this.state.address}
          />
        </Item>
      </Form>
    );
  }
}

export default CrimeForm;

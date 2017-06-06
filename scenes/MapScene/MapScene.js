import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  H3,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body
} from "native-base";
import { StyleSheet } from "react-native";
import { Constants } from "expo";

const styles = {
  container: {
    paddingTop: Constants.statusBarHeight
  }
};

class MapScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false,
      mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false
    });
  }

  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false
    });
  }

  toggleTab3() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
    });
  }

  toggleTab4() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true
    });
  }

  render() {
    return (
      <Container style={styles.container}>

        <Header>
          <Left>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />

        </Header>
        
        <Content padder>
          <Text> {JSON.stringify(styles.title)} </Text>
          <H3>This is content section</H3>
          <Text style={{ marginTop: 10 }}>
            Selected tab is:
            {" "}
            {this.state.tab1
              ? 1
              : this.state.tab2 ? 2 : this.state.tab3 ? 3 : 4}
          </Text>
        </Content>

        <Footer>
          <FooterTab>
            <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
              <Text>Apps</Text>
              <Icon name="ios-apps-outline" />
            </Button>
            <Button active={this.state.tab2} onPress={() => this.toggleTab2()}>
              <Text> Camera </Text>
              <Icon name="ios-camera-outline" />
            </Button>
            <Button active={this.state.tab3} onPress={() => this.toggleTab3()}>
              <Text>Navigate</Text>
              <Icon name="ios-compass" />
            </Button>
            <Button active={this.state.tab4} onPress={() => this.toggleTab4()}>
              <Text>Contact</Text>
              <Icon name="ios-contact-outline" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default MapScene;

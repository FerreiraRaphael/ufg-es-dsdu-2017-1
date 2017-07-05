import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  H3,
  Form,
  Header,
  Title,
  Button,
  Icon,
  Left
} from "native-base";
import { StyleSheet, View, TextInput } from "react-native";
import { Constants, MapView,LinearGradient } from "expo";
import SignInContainer from '../../containers/SignIn';


const styles = {
  container: {
    paddingTop: Constants.statusBarHeight
  },
  Titulo: {
    fontSize:65,
    textAlign:'center',
    color:'#E9F1FF',
    paddingBottom:20,
  },
  Descricao:{
    color:'#BCCFEF',
    textAlign:'center',
    paddingBottom:60
  }
};

class SignInScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack(null)}
            >
              <Icon name="ios-arrow-back" />
              <Text style={{ marginLeft: 10 }}>Faça o Login</Text>
            </Button>
          </Left>
        </Header>
        <LinearGradient
          colors={['#3a7bd5', '#00d2ff']}
          style={{
            flex: 1, width: '100%', alignItems: 'center',
            justifyContent: 'center'
          }} > 
          <View style={{width: '90%'}}>
            <View >
              <Text style={styles.Titulo}>iSecurity</Text>
              <Text style={styles.Descricao}>Veja tudo que está acontecendo 
                por dentro da cidade em que mora, ou um local que deseja visitar.</Text>
              <SignInContainer navigation={this.props.navigation} />
              <Text style={{ margin: 60, textAlign:'center', color:'#E9F1FF',fontWeight:'bold' }}>
                A segurança em suas mãos!!</Text>
            </View>
          </View>
          
        </LinearGradient>
      </Container>
    );
  }
}

export default SignInScreen;

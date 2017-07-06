import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  H3,
  Form,
  Icon,
  Button,
  Header, 
  Title,  
  Left 
} from "native-base";
import { StyleSheet, View, TextInput , Platform } from "react-native";
import { Constants, MapView,LinearGradient } from "expo";
import SignInContainer from '../../containers/SignIn';


const styles = {
  container: {
    paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight
  },
  Titulo: {
    fontSize:65,
    textAlign:'center',
    color:'#E9F1FF',
    paddingBottom:20,
    backgroundColor: 'transparent'
  },
  Descricao:{
    color:'#BCCFEF',
    textAlign:'center',
    paddingBottom:60,
    backgroundColor: 'transparent'
  }
};

class SignInScreen extends Component {
  constructor(props) {
    super(props);
  }

  async _goBack() {
    this.props.navigation.goBack(null);
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
              <Text style={{ margin: 60, textAlign:'center', color:'#E9F1FF',fontWeight:'bold'
              ,backgroundColor: 'transparent' }}>
                A segurança em suas mãos!!</Text>
            </View>
          </View>
          <Button style={{backgroundColor: 'transparent', alignSelf:'center',marginTop:15}}
            onPress={() => this._goBack()}>
            <Icon name="ios-close" style={{color:'#fff'}}/>
          </Button>
        </LinearGradient>
      </Container>
    );
  }
}

export default SignInScreen;

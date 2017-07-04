import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from '../../screens/Map';
import UserScreen from '../../screens/User';
import SignInScreen from '../../screens/SignIn';

const Navigator = TabNavigator(
  {
    Map: {
      screen: MapScreen,
      path: 'map',
      navigationOptions: {
        title: 'Mapa',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-map' : 'ios-map-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    User: {
      screen: UserScreen,
      path: 'user',
      navigationOptions: {
        title: 'Usuário',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-contact' : 'ios-contact-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    }
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? '#478FBC' : '#478FBC',
      inactiveTintColor: '#000000',
      style : {
        backgroundColor : '#fff'
      }
    },
  }
);

const Stack = StackNavigator({
  Root: {
    screen: Navigator,
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      title: 'Entrar',
      backgroundColor: '#fff'

    }
  },
  // SignUp: {
  //   screen: SignUpScreen,
  //   navigationOptions: {
  //     title: 'Cadastrar'
  //   }
  // }
},
  {
    headerMode: 'none',
  })

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

export default Stack;
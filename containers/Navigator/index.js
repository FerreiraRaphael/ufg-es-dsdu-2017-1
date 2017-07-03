import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import MapScreen from '../../screens/Map';
import UserScreen from '../../screens/User';
import SignInScreen from '../../screens/SignIn';

// const MyNavScreen = ({ navigation, banner }) => (
//   <ScrollView style={styles.container}>
//     <SampleText>{banner}</SampleText>
//     <Button
//       onPress={() => navigation.navigate('Home')}
//       title="Go to home tab"
//     />
//     <Button
//       onPress={() => navigation.navigate('Settings')}
//       title="Go to settings tab"
//     />
//     <Button onPress={() => navigation.goBack(null)} title="Go back" />
//   </ScrollView>
// );

// const MyHomeScreen = ({ navigation }) => (
//   <MyNavScreen banner="Home Tab" navigation={navigation} />
// );

// MyHomeScreen.navigationOptions = {
//   tabBarLabel: 'Home',
//   tabBarIcon: ({ tintColor, focused }) => (
//     <Ionicons
//       name={focused ? 'ios-home' : 'ios-home-outline'}
//       size={26}
//       style={{ color: tintColor }}
//     />
//   ),
// };

// const MyPeopleScreen = ({ navigation }) => (
//   <MyNavScreen banner="People Tab" navigation={navigation} />
// );

// MyPeopleScreen.navigationOptions = {
//   tabBarLabel: 'People',
//   tabBarIcon: ({ tintColor, focused }) => (
//     <Ionicons
//       name={focused ? 'ios-people' : 'ios-people-outline'}
//       size={26}
//       style={{ color: tintColor }}
//     />
//   ),
// };

// const MyChatScreen = ({ navigation }) => (
//   <MyNavScreen banner="Chat Tab" navigation={navigation} />
// );

// MyChatScreen.navigationOptions = {
//   tabBarLabel: 'Chat',
//   tabBarIcon: ({ tintColor, focused }) => (
//     <Ionicons
//       name={focused ? 'ios-chatboxes' : 'ios-chatboxes-outline'}
//       size={26}
//       style={{ color: tintColor }}
//     />
//   ),
// };

// const MySettingsScreen = ({ navigation }) => (
//   <MyNavScreen banner="Settings Tab" navigation={navigation} />
// );

// MySettingsScreen.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ tintColor, focused }) => (
//     <Ionicons
//       name={focused ? 'ios-settings' : 'ios-settings-outline'}
//       size={26}
//       style={{ color: tintColor }}
//     />
//   ),
// };

const Navigator = TabNavigator(
  {
    Map: {
      screen: MapScreen,
      path: '',
      navigationOptions: {
        title: 'Mapa',
      },
    },
    User: {
      screen: UserScreen,
      path: 'user',
      navigationOptions: {
        title: 'Usuário',
      },
    }
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
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
      title: 'Entrar'
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
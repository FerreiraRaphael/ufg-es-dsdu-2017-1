import React, { Component } from "react";
import { Container, Icon, Fab, View, Button, Text } from "native-base";
<<<<<<< HEAD
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Platform, Dimensions } from "react-native";
=======
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Platform, Dimensions } from "react-native"; 
>>>>>>> develop
import { MapView, Location, Permissions } from "expo";
import firebase from "firebase";
import GeoFire from "geofire";
import config from "../../config/config";
import { getAddress } from '../../services/maps';
const { Marker } = MapView;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      locationResult: false,
      mapRegion: {
        latitude: -16.6815803,
        longitude: -49.258389,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      crimes: [],
      aim: false
    };
  }

  componentDidMount() {
    this._getLocation();
    firebase
      .database()
      .ref("crimes")
      .on("value", snap => this._handleCrimesChange(snap));
    firebase.auth().onAuthStateChanged(user => this._handleUserAuth(user));
  }

  async _getLocation() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: false
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: location });
    this._centerMap();
  }

  _handleUserAuth(user) {
    if (user) {
      let { email, uid } = user;
      user = { email, uid };
    }
    this.setState({ user });
  }

  _handleMainButtonClick() {
    if (!this.state.user) {
      this.props.navigation.navigate("SignIn");
      return;
    }
    if (this.state.aim) {
      let { longitude, latitude } = this.state.mapRegion;
      this.props.navigation.navigate('Crime', { userId: this.state.user.uid, latitude, longitude });
    }
    let aim = !this.state.aim;
    this.setState({ aim });
  }

  async _createNewCrime() {
    let key = firebase.database().ref("crimes").push().key;
    let { latitude, longitude } = this.state.mapRegion;

    let googleResult = await getAddress({ longitude, latitude });
    let crime = {
      title: "x",
      description: "x",
      userId: this.state.user.uid,
      latitude,
      longitude
    };
    if (googleResult.results[0]) {
      Object.assign(crime, {
        address: googleResult.results[0].formatted_address
      });
    }
    firebase.database().ref("crimes/" + key).set(crime);
  }

  _centerMap() {
    let { longitude, latitude } = this.state.locationResult.coords;
    let mapRegion = Object.assign({}, this.state.mapRegion, {
      longitude,
      latitude
    });
    this.setState({ mapRegion });
  }

  _handleCrimesChange(snap) {
    let crimes = snap.val();
    this.setState({ crimes });
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _renderMarkers() {
    let { crimes } = this.state;
    let keys = Object.keys(crimes);
    return keys.map(key => {
      let crime = crimes[key];
      let { latitude, longitude } = crime;
      let coordinate = { latitude, longitude };
      return (
        <Marker
          key={key}
          title={crime.title}
          description={crime.description}
          coordinate={coordinate}
        />
      );
    });
  }

  _renderAim() {
    let { latitude, longitude } = this.state.mapRegion;
    let coordinate = { latitude, longitude };
    return (
      <Marker
        coordinate={coordinate}
      />
    );
  }

  _renderMainButton() {
    if (!this.state.user) {
      return (
        <Button style={{backgroundColor: '#478FBC'}}
          full success
          onPress={() => this._handleMainButtonClick()}>
          <Text style={styles.text}>Entrar</Text>
          <Ionicons name="ios-log-in" size={32} color="#fff" />
        </Button>
      );
    }
    return (
      <Button style={{backgroundColor: '#478FBC'}}
        full success
        onPress={() => this._handleMainButtonClick()}>
        <Text style={styles.text}>{this.state.aim ? 'Aqui !' : 'Registrar Ocorência'}</Text>
        <Ionicons name={this.state.aim ? "ios-locate-outline" : "ios-add"} size={32} color="#fff" />
      </Button>
    );
  }

  _renderFAB() { }

  render() {
    return (
      <Container>
        <MapView
          style={styles.map}
          region={this.state.mapRegion}
          provider="google"
          onRegionChange={this._handleMapRegionChange}
        >
          {this.state.aim ? this._renderAim() : this._renderMarkers()}
        </MapView>
        <Fab
          style={styles.fab}
          position="bottomLeft"
          onPress={() => this._centerMap()}>
          <Icon name="locate" style={{ color: '#478FBC' }}/>
        </Fab>
        <View style={styles.actionButton}>
          {this._renderMainButton()}
        </View>
      </Container>
    );
  }
}

const { height, width } = Dimensions.get('window'); 

const styles = {
  map: {
    flex: 1,
    marginBottom: 100
  },
  fab: {
    backgroundColor: '#F9FCFF',
    bottom: Platform.OS === "ios" ? 50 + 130 : 65 + 100, 
    left: -15
  },
  actionButton: {
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: Platform.OS === "ios" ? 50 + 100 : 50 + 80, 
    justifyContent: 'center', alignItems: 'center'
  },
  button: {
    width: 40
  },
  text: {
    marginRight: 10
  }
};

export default Map;

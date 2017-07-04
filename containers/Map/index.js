import React, { Component } from "react";
import { Container, Icon, Fab, View, Button, Text } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Platform } from 'react-native';
import { MapView, Location, Permissions } from "expo";
import firebase from 'firebase';
import GeoFire from 'geofire';
import config from '../../config/config';

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
      crimes: []
    };
  }

  componentDidMount() {
    this._getLocation();
    firebase.database().ref('crimes').on('value', snap => this._handleCrimesChange(snap));
    firebase.auth().onAuthStateChanged((user) => this._handleUserAuth(user));
  }

  async _getLocation() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: false,
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: location });
    this._centerMap();
  };

  _handleUserAuth(user) {
    if (user) {
      let { email, uid } = user
      user = { email, uid };
    }
    this.setState({ user });
  }

  _handleMainButtonClick() {
    if (!this.state.user) {
      this.props.navigation.navigate('SignIn');
      return;
    }
    this._createNewCrime()
  }

  async _createNewCrime() {
    let key = firebase.database().ref('crimes').push().key;
    let { latitude, longitude } = this.state.mapRegion;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${config.geolocationKey}`


    let googleResult = await fetch(url).then(res => res.json());
    let crime = {
      title: 'x',
      description: 'x',
      userId: this.state.user.uid,
      latitude, longitude
    }
    if (googleResult.results[0]) {
      Object.assign(crime, { address: googleResult.results[0].formatted_address })
    }
    firebase.database().ref('crimes/' + key).set(crime);
  }

  _centerMap() {
    let { longitude, latitude } = this.state.locationResult.coords;
    let mapRegion = Object.assign({}, this.state.mapRegion, { longitude, latitude });
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
        <MapView.Marker
          key={key}
          title={crime.title}
          description={crime.description}
          coordinate={coordinate} />
      )
    });
  }

  
  render() {
    const { Marker } = MapView;
    return (
      <Container>
        <MapView
          style={styles.map}
          region={this.state.mapRegion}
          provider="google"
          onRegionChange={this._handleMapRegionChange}>
          {this._renderMarkers()}
        </MapView>
        <Fab
          style={{
            backgroundColor: '#5067FF',
            bottom: Platform.OS === 'ios' ? 200 : 140,
            left: -15
          }}
          position="bottomLeft"
          onPress={() => this._centerMap()}>
          <Icon name="locate" />
        </Fab>
        <View style={styles.actionButton}>
          <Button
            full success
            onPress={() => this._handleMainButtonClick()}>
            <Text style={styles.text}>{this.state.user ? 'Registrar Ocorrência' : 'Entrar'}</Text>
            <Ionicons name={this.state.user ? "ios-add" : "ios-log-in"} size={32} color="#fff" />
          </Button>
        </View>
      </Container>

    );
  }
}

const styles = {
  map: {
    flex: 1,
    marginBottom: 100
  },
  actionButton: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: Platform.OS === 'ios' ? 160 : 130,
    justifyContent: 'center', alignItems: 'center'
  },
  button: {
    width: 40
  },
  text: {
    marginRight: 20
  }
};

export default Map;

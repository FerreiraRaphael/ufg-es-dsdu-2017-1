import React, { Component } from "react";
import { Container, Icon, Fab, View, Button, Text } from "native-base";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Platform, Dimensions } from "react-native";
import { MapView, Location, Permissions } from "expo";
import firebase from "firebase";
import GeoFire from "geofire";
import config from "../../config/config";
import { getAddress } from "../../services/maps";
const { Marker } = MapView;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
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
      this.props.onLocationChange(false);
      return;
    }

    let locationResult = await Location.getCurrentPositionAsync({});
    this.props.onLocationChange(locationResult);
    if(!this.props.searchResult)
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
      let { longitude, latitude, latitudeDelta, longitudeDelta  } = this.props.mapRegion;
      this.props.navigation.navigate("Crime", {
        userId: this.state.user.uid,
        latitude,
        longitude, 
        latitudeDelta, 
        longitudeDelta 
      });
    }
    let aim = !this.state.aim;
    this.setState({ aim });
  }

  async _centerMap() {
    if(!this.props.locationResult) {
      await this._getLocation();
      return;
    }
    let { longitude, latitude} = this.props.locationResult.coords;
    let { latitudeDelta, longitudeDelta } = {latitudeDelta: 0.0085,longitudeDelta: 0.0085}
    let mapRegion = Object.assign({}, this.props.mapRegion, {
      longitude,
      latitude, 
      latitudeDelta, 
      longitudeDelta 
    });
    this.props.onMapRegionChange(mapRegion);
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
      let { latitude, longitude, latitudeDelta, longitudeDelta  } = crime;
      let coordinate = { latitude, longitude, latitudeDelta, longitudeDelta  };
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

  _handleFabClick() {
    this.state.aim ? this.setState({aim: false}): this._centerMap();
  }

  _renderAim() {
    let { latitude, longitude, latitudeDelta, longitudeDelta  } = this.props.mapRegion;
    let coordinate = { latitude, longitude, latitudeDelta, longitudeDelta  };
    return <Marker coordinate={coordinate} />;
  }

  _renderMainButton() {
    if (!this.state.user) {
      return (
        <Button
          style={{ backgroundColor: "#478FBC" }}
          full
          success
          onPress={() => this._handleMainButtonClick()}
        >
          <Text style={styles.text}>Entrar</Text>
          <Ionicons name="ios-log-in" size={32} color="#fff" />
        </Button>
      );
    }
    return (
      <Button
        style={{ backgroundColor: "#478FBC" }}
        full
        success
        onPress={() => this._handleMainButtonClick()}
      >
        <Text style={styles.text}>
          {this.state.aim ? "Aqui !" : "Registrar Ocorrência"}
        </Text>
        <Ionicons
          name={this.state.aim ? "ios-locate-outline" : "ios-add"}
          size={32}
          color="#fff"
        />
      </Button>
    );
  }

  _renderFAB() {

  }

  render() {
    return (
      <Container style={{flex:1}}>
        <MapView
          style={styles.map}
          region={this.props.mapRegion}
          provider="google"
          onRegionChange={(mapRegion) => this.props.onMapRegionChange(mapRegion)}
        >
          {this.state.aim ? this._renderAim() : this._renderMarkers()}
        </MapView>
        <Fab
          style={styles.fab}
          position="bottomRight"
          onPress={() => this._handleFabClick()}
        >
          <Icon name={this.state.aim ? "close" : "locate"} style={{ color: "#478FBC" }} />
        </Fab>
        <View style={styles.actionButton}>
          {this._renderMainButton()}
        </View>
      </Container>
    );
  }
}

const { height, width } = Dimensions.get("window");

const styles = {
  map: {
    flex: 1,
    // marginBottom: 100
  },
  fab: {
    backgroundColor: "#F9FCFF",
    bottom: 50,
    left: 0
  },
  actionButton: {
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: 40
  },
  text: {
    marginRight: 10
  }
};

export default Map;

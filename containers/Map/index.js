import React, { Component } from "react";
import { Container, Button, Text, Fab, Icon } from "native-base";
import { StyleSheet, View } from 'react-native';
import { MapView } from "expo";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  render() {
    return (
      <Container>
        <MapView
          style={styles.map}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}
        />
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
    bottom: 100,
    justifyContent: 'center', alignItems: 'center'
  },
  button: {
    width: 40
  }
};

export default Map;

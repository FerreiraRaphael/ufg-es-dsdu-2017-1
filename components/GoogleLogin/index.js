import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  Button,
  Text,
  Icon
} from "native-base";
import styles from './styles';

const GoogleLogin = ({
  onPress
}) => 
    <Button 
      full 
      onPress={onPress}
      style={styles.button}>
      <Icon name="logo-google"/>
      <Text>Google</Text>
    </Button>
  

GoogleLogin.ViewPropTypes = {
  onPress: PropTypes.func.isRequired,
}

export default GoogleLogin;

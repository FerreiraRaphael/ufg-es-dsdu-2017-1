import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  Button,
  Text,
  Icon
} from "native-base";
import styles from './styles';

const FacebookLogin = ({
  onPress
}) => 
    <Button 
      full 
      onPress={onPress}
      style={styles.button}>
      <Icon name="logo-facebook" style={{color:'#497ED3'}}/>
      <Text style={{color: '#497ED3'}}>Entrar com o Facebook</Text>
    </Button>
  

FacebookLogin.ViewPropTypes = {
  onPress: PropTypes.func.isRequired,
}

export default FacebookLogin;

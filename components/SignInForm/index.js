import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  Item,
  Input,
  Form,
  Button,
  Text,
  Label
} from "native-base";
import styles from './styles';

const SignInForm = ({
  onEmailChange,
  onPasswordChange,
  onSubmit
}) => 
  <Form>
    <Item floatingLabel>
      <Label>Email</Label>
      <Input 
        style={styles.input}
        onChange={onEmailChange}/>
    </Item>
    <Item floatingLabel>
      <Label>Senha</Label>
      <Input 
        style={styles.input}
        onChange={onPasswordChange}/>
    </Item>
    <Button 
      full 
      onPress={onSubmit}
      style={styles.button}>
      <Text>Entrar</Text>
    </Button>
  </Form>

SignInForm.ViewPropTypes = {
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChangeChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SignInForm;

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

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmitClick(event) {
    debugger
  }

  render() {
    return (
          <Form>
              <Text>{`${this.state.email} ${this.state.email}`}</Text>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input 
                  style={styles.input}
                  ref={(input) => { this.textInput = input; }}/>
              </Item>
              <Item floatingLabel>
                <Label>Senha</Label>
                <Input 
                  style={styles.input}
                  ref={(input) => { this.password = input; }}/>
              </Item>
              <Button 
                full 
                onPress={ event => this.handleSubmitClick(event) }
                style={styles.button}>
                <Text>Entrar</Text>
              </Button>
          </Form>
    );
  }
}

SignInForm.propTypes = {
  // onSubmit: PropTypes.func.isRequired
}

export default SignInForm;

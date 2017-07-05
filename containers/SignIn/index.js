import React, { Component } from "react";
import { Container, Text, Button, View } from "native-base";
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { Facebook } from 'expo';
import SignInForm from '../../components/SignInForm';
import FacebookLogin from '../../components/FacebookLogin';
import GoogleLogin from '../../components/GoogleLogin';
import styles from './styles';


class SignInContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    onEmailChange(event) {
        let email = event.nativeEvent.text;
        this.setState({ email })
    }
    onPasswordChange(event) {
        let password = event.nativeEvent.text;
        this.setState({ password })
    }
    onSignUpClick() {
        let { navigator } = this.props;
    }
    async onSubmit() {
        let { email, password } = this.state;
        let result = await firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(error => { });
        let { navigator } = this.props;
        navigator.navigate('Map');
    }
    async _onFacebookLoginPress() {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            '312142059240051',
            { permissions: ['public_profile'] }
        );

        if (type === 'success') {
            // Build Firebase credential with the Facebook access token.
            const credential = firebase.auth.FacebookAuthProvider.credential(token);

            // Sign in with credential from the Facebook user.
            await firebase.auth().signInWithCredential(credential).catch(e => { });
            this.props.navigation.goBack(null);
        }
    }

    render() {
        return (
            <View>
                
                <FacebookLogin
                    onPress={() => this._onFacebookLoginPress()} />

            </View>
        );
    }
}

SignInContainer.ViewPropTypes = {
    navigator: PropTypes.object.isRequired
}

export default SignInContainer;

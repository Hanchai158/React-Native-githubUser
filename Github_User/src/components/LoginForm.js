import React, {Component} from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import firebase from '@firebase/app'; 
import '@firebase/auth';  
import { Actions } from 'react-native-router-flux';
import {Button, Card, CardSection, Input, Logo, InputLogin, ButtonLogin, SignButton, Spinner} from './common';

class LoginForm extends Component{
    state = { email: '', password: '', error: '', loading: false };

    onEmailChange(text){
        this.props.emailChanged(text);
    }

    onPasswordChange(text){
        this.props.passwordChanged(text);
    }

    onButtonPress(){
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    onRegister(){
        Actions.register();
    }

    renderButton(){
        if(this.props.loading){
            return <Spinner size="large" />
        }

        return (
            <ButtonLogin onPress={this.onButtonPress.bind(this)}>
                Login
            </ButtonLogin>
        );
    }

    renderError(){
        //console.log(this.props.error);
        if(this.props.error){
            return (
                <View style={styles.containerStyle}>
                    <TouchableOpacity style={styles.alertBox}>
                        <Text style={styles.errorTextStyle}>
                            {this.props.error}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    render(){
        const { container, logoText, cardSection, inputBox, containerStyle } = styles;

        return(
            <View style={container}>
                <Logo source={require('../images/logo.png')}/>
                <Text style={logoText}>Welcome to My app.</Text>
                <View>
                    <View style={containerStyle}>
                        <InputLogin 
                            placeholder="user@gmail.com"
                            value={this.props.email}
                            onChangeText={this.onEmailChange.bind(this)}
                        /> 
                    </View>
                    <View style={containerStyle}>
                        <InputLogin 
                            secureTextEntry
                            placeholder="password"
                            value={this.props.password}
                            onChangeText={this.onPasswordChange.bind(this)}
                        /> 
                    </View>
                    {this.renderError()}
                    <View style={containerStyle}>
                        {this.renderButton()}
                    </View> 
                </View>

                <SignButton label="Don't have an account yet?" sign=" Signup " onPress={this.onRegister.bind(this)}/>
            </View> 
        );
    }
}

const styles = {
    container : {
        backgroundColor:'#455a64',
        flex: 1,
        flexGrow: 1,
        alignItems:'center',
        justifyContent :'center',
    },
    logoText : {
        fontSize:18,
        color:'rgba(255, 255, 255, 0.7)'
    },
    cardSection: {
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    alertBox: {
        flex: 1,
        width:300,
        color:'red',
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#007aff',
    },
    containerStyle: {
        padding: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }

}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return {
        email,
        password,
        error,
        loading

    };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser})(LoginForm);
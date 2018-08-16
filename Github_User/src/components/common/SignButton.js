import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';


const SignButton = ({ label, onPress, sign }) => {
    const { signupTextCont, signupText, signupButton } = styles;

    return(
        <View style={signupTextCont}>
            <Text style={signupText}>{label}</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={signupButton}>{sign}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    signupTextCont : {
        flexGrow: 1,
        alignItems:'flex-end',
        justifyContent :'center',
        paddingVertical:16,
        flexDirection:'row'
    },
    signupText: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    },
    signupButton: {
        color:'#ffffff',
        fontSize:16,
        fontWeight:'500'
    }
}

export { SignButton };
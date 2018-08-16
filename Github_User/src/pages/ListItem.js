import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, ButtonFollow } from '../components/common';
import { githubSave } from '../actions';
import { connect } from 'react-redux';

class ListItem extends Component {
    onRowPress(){
        Actions.githubDetail({ github: this.props.github});
    }

    onChangeFollow(){
        const { login, avatar_url, url, node_id, follow_status , id} = this.props.github;
       // console.log("after : "+follow_status ,id);
        if(follow_status){
            this.props.githubSave({ login, avatar_url, url, node_id, follow_status: false, id });
        }else{
            this.props.githubSave({ login, avatar_url, url, node_id, follow_status: true, id });
        }
    }

    renderFollowStatus(){
        const { follow_status } = this.props.github;
        const { buttonFollow, buttonUnfollow } = styles;
        //console.log(follow_status);
        if(follow_status){
            return (
                <ButtonFollow onPress={this.onChangeFollow.bind(this)} color={buttonFollow}>
                    Follow
                </ButtonFollow> 
            );
        }else{
            return (
                <ButtonFollow onPress={this.onChangeFollow.bind(this)} color={buttonUnfollow}>
                    Unfollow
                </ButtonFollow> 
            );
        }
    }

    render(){
        const { login, avatar_url } = this.props.github;
        const {
            imageStyle,
            headerContentStyle,
            containerStyle,
            headerTextStyle
        } = styles;
        //console.log(avatar_url);
        return(
            <TouchableWithoutFeedback  onPress={this.onRowPress.bind(this)} >
                <View>
                    <CardSection style={{ flex: 1 }}>
                        <View style={containerStyle}>
                            <Image
                            style={imageStyle}
                            source={{ uri: avatar_url }} 
                            /> 
                        </View>
                        <View style={headerContentStyle}>
                            <Text style={headerTextStyle}>{login}</Text>
                        </View>
                        {this.renderFollowStatus()}
                    </CardSection> 
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    headerContentStyle: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18
    },
    imageStyle:{
        flex: 1,
        height: 60,
        width: 60,
        borderRadius: 75,
    },
    containerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    buttonFollow:{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#05C037',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 15,
        width: 80, height: 30,

    },
    buttonUnfollow:{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#696969',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 15,
        width: 80, height: 30,

    },

};

export default connect(null, { githubSave })(ListItem);
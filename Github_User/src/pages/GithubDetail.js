import React, {Component} from 'react';
import { ScrollView, Text, Image, View, ListView } from 'react-native';
import axios from 'axios';
import {ButtonFollow, Card, CardSection, Spinner} from '../components/common';
import { Actions } from 'react-native-router-flux';
import { githubSaveDetail, githubFetch } from '../actions';
import { connect } from 'react-redux';
import { validateArgCount } from '../../node_modules/@firebase/util';
import _ from 'lodash';
/* import _ from 'lodash';
import UserDetail from './UserDetail'; */

class GithubDetail extends Component {
    state = { userDetail: [],
                follStatus: false };

    componentWillMount() {
        this.props.githubFetch();
        const { follow_status } = this.props.github;
        this.setState({follStatus : follow_status});
        const { url } = this.props.github;
        axios.get(url).then(response => this.setState({ userDetail: response.data }));
    }    

    onChangeFollow(){
        const { login, avatar_url, url, node_id, follow_status , id} = this.props.github;
        if(this.state.follStatus){
            this.props.githubSaveDetail({ login, avatar_url, url, node_id, follow_status: false, id });
            this.setState({ follStatus: false});
        }else{
            this.props.githubSaveDetail({ login, avatar_url, url, node_id, follow_status: true, id });
            this.setState({ follStatus: true});
        }
    }

    renderFollowStatus(){
    
        const { buttonFollow, buttonUnfollow } = styles;
        if(this.state.follStatus){
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
        const { login, avatar_url, url, name, followers, following, bio, location } = this.state.userDetail;
        const {
            bodyTextStyle,
            headerContentStyle,
            bodyContentStyle,
            headerTextStyle,
            imageStyle,
        } = styles;
        return (
            <Card>
                <CardSection>
                    <View style={headerContentStyle}>
                        <Image style={imageStyle} 
                                source={{ uri: avatar_url }} 
                            />
                        <Text style={headerTextStyle}>{name}</Text>
                        <Text>@{login}</Text>
                    </View>
                </CardSection>
                <CardSection>
                    <View style={headerContentStyle}>
                        <Text >{followers}</Text>
                        <Text>followers</Text>
                    </View>
                    <View style={headerContentStyle}>
                        <Text >{following}</Text>
                        <Text>following</Text>
                    </View>
                    
                       {this.renderFollowStatus()} 
                  
                </CardSection>
                <CardSection>
                    <View style={bodyContentStyle}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={bodyTextStyle}>Bio: </Text><Text >{bio}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={bodyTextStyle}>Location: </Text><Text >{location}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={bodyTextStyle}>Url: </Text><Text >{url}</Text>
                        </View>
                    </View>
                </CardSection>
            </Card> 
        );
    }
    
}

const styles = {
    bodyContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    bodyTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    thumbnailStyle:{
        height: 50,
        width: 50
    },
    imageStyle: {
        height: 120,
        width: 120,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContentStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
        marginTop: 10,
        width: 80, height: 30,

    },
};

export default connect(null, { githubSaveDetail, githubFetch })(GithubDetail);
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import { Actions } from 'react-native-router-flux';
import {
    GITHUB_UPDATE,
    GITHUB_CREATE,
    GITHUB_FETCH_SUCCESS,
    GITHUB_SAVE_SUCCESS,
    GITHUB_SEARCH,
    GITHUB_SAVEDETAIL_SUCCESS
} from './types';
import _ from 'lodash';


export const githubUpdate = ({ prop, value }) => {
    return {
        type: GITHUB_UPDATE,
        payload: { prop, value }

    };
};

const testCreate = ({ login, avatar_url, url, node_id, i }) => {
    const { currentUser } = firebase.auth();
    console.log( login );
    console.log(i.toString());
    console.log(currentUser);
    firebase.database().ref(`/users/${currentUser.uid}/github_user/`)
    .child(i.toString())
    .set({
        avatar_url : avatar_url,
        follow_status : true,
        login : login,
        node_id : node_id,
        url : url
    });
};

export const githubCreate = ({ userList }) => {
    console.log( userList );
    let i=0,j=0;
    let arr_login = [];
    let arr_avatar_url = [];
    let arr_url = [];
    let arr_node_id = [];
  userList.map((val) =>{
        arr_login[j] = val.login;
        arr_avatar_url[j] = val.avatar_url;
        arr_url[j] = val.url;
        arr_node_id[j] = val.node_id;
        j++;
    });
    console.log(arr_login[0]);
     _.each(userList, val=>{
        testCreate({login: arr_login[i], 
        avatar_url: arr_avatar_url[i], 
        url: arr_url[i], 
        node_id: arr_node_id[i], 
        i : i});
         i++;
     });         
};


export const githubFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/github_user`)
            .on('value', snapshot => {
               // console.log("Value : => "+snapshot.val())
                dispatch({ type: GITHUB_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};
 
export const githubSave = ({ login, avatar_url, url, node_id, follow_status, id }) => {
    const { currentUser } = firebase.auth();
    //console.log(follow_status, id);

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/github_user/${id}`)
            .set({ login, avatar_url, url, node_id, follow_status })
            .then(() => {
                dispatch({ type: GITHUB_SAVE_SUCCESS });
                Actions.githubList();
            });
    };  

};

export const githubSaveDetail = ({ login, avatar_url, url, node_id, follow_status, id }) => {
    const { currentUser } = firebase.auth();
    //console.log(follow_status, id);
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/github_user/${id}`)
            .set({ login, avatar_url, url, node_id, follow_status })
            .then(() => {
                dispatch({ type: GITHUB_SAVEDETAIL_SUCCESS });
                //githubFetch();
                Actions.githubDetail();
            });
    };  

};

export const githubDelete = ({ id }) => {
    const { currentUser } = firebase.auth();

    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${id}`)
            .remove()
            .then(()=> {
                Actions.GithubList();
            });
    };
};

export const githubSearch = ({ login }) => {
    console.log(login);
}
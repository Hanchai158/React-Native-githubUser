import {
    GITHUB_FETCH_SUCCESS
} from '../actions/types';

const INITAL_STATE = {};

export default (state = INITAL_STATE, action ) => {
    switch (action.type){
        case GITHUB_FETCH_SUCCESS:
           // console.log(action);
            return action.payload ;
        default:
            return state;
    }
};
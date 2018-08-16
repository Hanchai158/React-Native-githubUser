import {
    GITHUB_UPDATE,
    GITHUB_CREATE,
    GITHUB_SAVE_SUCCESS,
    GITHUB_SAVEDETAIL_SUCCESS
} from '../actions/types' ;

const INITIAL_STATE = {
    login: '',
    avatar_url: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GITHUB_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case GITHUB_CREATE:
            return INITIAL_STATE;
        case GITHUB_SAVE_SUCCESS:
            return INITIAL_STATE;    
        case GITHUB_SAVEDETAIL_SUCCESS:
            return INITIAL_STATE;   
        default:
            return state;
    }
};
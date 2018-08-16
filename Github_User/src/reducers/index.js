import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import GithubReducer from './GithubReducer';

export default combineReducers({
  auth: AuthReducer,
  github: GithubReducer
});
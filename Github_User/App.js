import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from '@firebase/app';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import {Header, Button, Spinner} from './src/components/common';
import LoginForm from './src/components/LoginForm';
import Router from './src/Router';
/* import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']); */

class App extends Component {
  
  componentDidMount(){
    const config = {
      apiKey: 'AIzaSyB0oK2QIP9x7FtosdUGxSgVU7hoXto_pO4',
      authDomain: 'github-user-60875.firebaseapp.com',
      databaseURL: 'https://github-user-60875.firebaseio.com',
      projectId: 'github-user-60875',
      storageBucket: 'github-user-60875.appspot.com',
      messagingSenderId: '589980915369'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;

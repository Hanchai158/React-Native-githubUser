import React from 'react'
import { Scene, Router ,Actions } from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
import GithubList from './pages/GithubList';
import GithubDetail from './pages/GithubDetail';
import { Input } from '../src/components/common';
import RegisterForm from './components/RegisterForm';

const RouterComponent = () => {
    return(
        <Router sceneStyles={{ paddingTop: 65 }}>
            <Scene key="root" hideNavBar>
                <Scene key="auth" hideNavBar={true}>
                     <Scene key="login" component={LoginForm} title= "Please Login" initial/>
                     <Scene key="register" component={RegisterForm} title= "Register" />
                </Scene>

                <Scene key ="main"> 
                    <Scene 
                        onRight={() => {}}
                        rightButtonImage={require('../src/images/Icon/icon-search.png')}  
                        key="githubList"
                        component={GithubList} 
                        title="Github User"
                        navigationBarStyle={{ backgroundColor: '#40E0D0' }}
                        titleStyle={{ textAlign: 'center', flex: 1 }}
                        back={true}
                        initial
                     /> 
                    <Scene 
                    key="githubDetail" 
                    component ={GithubDetail} 
                    navigationBarStyle={{ backgroundColor: '#40E0D0' }}
                    titleStyle={{ textAlign: 'center', flex: 1 }}
                    title="User Detail" />
                </Scene> 
            </Scene>
        </Router>
    );
};

export default RouterComponent;

import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import store from './store/index';
import Login from "./container/login";
import Register from "./container/register";
import AuthRoute from './component/authroute';
import BossInfo from "./container/bossinfo";
import GeniusInfo from "./container/geniusinfo";
import DashBoard from "./component/dashboard";
import Chat from './component/chat';


class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <AuthRoute/>
                        <Switch>
                            <Route path='/geniusinfo' component={GeniusInfo}/>
                            <Route path='/bossinfo' component={BossInfo}/>
                            <Route path='/login' component={Login}/>
                            <Route path='/register' component={Register}/>
                            <Route path='/chat/:user' component={Chat}/>
                            <Route component={DashBoard}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { NavBar} from 'antd-mobile';
import NavLinkBar from '../navLinkBar';
import {Route,Switch} from 'react-router-dom';
import Boss from '../../component/boss';
import Genius from '../../component/genius';
import User from '../../component/user';
import Msg from '../../component/msg';
import '../../index.css';
import {actioncreators} from "../../store/chatstore";

class DashBoard extends Component{
    componentDidMount() {
        if (!this.props.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }

    }
    render(){
        const {pathname} = this.props.location;
        const type = this.props.type;
        //console.log(this.props);
        const navList = [{
            path:'/boss',
            text:'天才',
            icon:'boss',
            title:'天才列表',
            component:Boss,
            hide:type ==='genius'
        },{
            path:'/genius',
            text:'boss',
            icon:'job',
            title:'Boss列表',
            component:Genius,
            hide:type ==='boss'
        },{
            path:'/msg',
            text:'消息',
            icon:'msg',
            title:'消息列表',
            component:Msg,
        },{
            path:'/me',
            text:'我',
            icon:'user',
            title:'个人中心',
            component:User,
        }];
        return(
            <div>//                       find方法返回path与pathname相等的值，否则返回undefined
                <NavBar className='fixed-header' mode='dark'>{navList.find(v=>v.path===pathname).title}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}/>
                        ))}
                    </Switch>
                </div>
                <div className='fixed-navBar'>
                    <NavLinkBar data={navList}/>
                </div>

            </div>
        )
    }
}

const MapStateToProps = (state)=>({
    type:state.userReducer.type,
    chatmsg:state.chatReducer.chatmsg
})

const MapDispatchToProps=(dispatch)=>({
    getMsgList(){
        dispatch(actioncreators.getMsgList());
    },
    recvMsg(){
        dispatch(actioncreators.recvMsg())
    }
})

export default connect(MapStateToProps,MapDispatchToProps)(DashBoard);
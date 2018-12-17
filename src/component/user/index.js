import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Result,List,WhiteSpace,Modal} from 'antd-mobile';
import browserCookie from 'browser-cookies';
import {actioncreators} from '../../store/userStore';
import {Redirect}from 'react-router-dom';


class User extends Component{

    logout = ()=>{
        Modal.alert('注销','确认退出登录吗？',[
            {text:'取消',onPress:()=>{}},
            {text:'确定',onPress:()=>{
                    browserCookie.erase('userid');//清除cookie
                    console.log('cookie已经清除');
                    this.props.logoutSubmit();
                }}
        ]);
    }
    render(){
        const {user,avatar,type,company,title,desc,salary,redirectTo} = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        return this.props.user?(
            <div>
                <Result img={<img src={require(`../img/${avatar}.png`)} style={{width:50}} alt='' />}
                        title={user}
                        message={type === 'boss' ? company :null}
                />
                <List renderHeader={()=>'简介'}>
                    <Item multipleLine>
                        {title}
                        {desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {salary ? <Brief>薪资:{salary}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ): <Redirect to={redirectTo}/>
    }
}

const MapStateToProps = (state)=>({
    user:state.userReducer.user,
    avatar:state.userReducer.avatar,
    type:state.userReducer.type,
    company:state.userReducer.company,
    title:state.userReducer.title,
    desc:state.userReducer.desc,
    salary:state.userReducer.salary,
    redirectTo:state.userReducer.redirectTo
});

const MapDispatchToProps = (dispatch)=>({
    logoutSubmit(){
        dispatch(actioncreators.logoutSubmit())
    }
})
export default connect(MapStateToProps,MapDispatchToProps)(User);
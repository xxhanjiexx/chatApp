import React, { Component } from 'react';
import {Button,List,InputItem,WingBlank,WhiteSpace}from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from'react-router-dom'
import {actioncreators} from '../../store/userStore'
import Logo from '../../component/logo';
import {reactForm} from "../../component/react-form";

class Login extends Component {

    handleRegister = () =>{
        this.props.history.push('/register');
        console.log(this.props);
    }

    handleLogin = () =>{
        this.props.login(this.props.state);
    }

    render() {
        const {redirectTo,msg}= this.props;
        return (
            <div>
                {(redirectTo && redirectTo!=='/login') ? <Redirect to={redirectTo}/>:null}
                <Logo/>
                <WingBlank>
                    <List>
                        {msg ? <p>{msg}</p> : null}
                        <InputItem
                            onChange={v=>this.props.handleChange('user',v)}
                        >用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v=>this.props.handleChange('pwd',v)}
                            type='password'
                        >密码</InputItem>
                    </List>
                    <Button
                        onClick={this.handleLogin}
                        type='primary'
                    >登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.handleRegister} type='primary'>注册</Button>
                </WingBlank>
            </div>
        );
    }
}

const MapStateToProps = (state) =>({
    msg : state.userReducer.msg,
    redirectTo : state.userReducer.redirectTo
})

const MapDispatchToProps = (dispatch)=>({
    login(state){
        dispatch(actioncreators.login(state));
    }
})

export default reactForm(connect(MapStateToProps,MapDispatchToProps)(Login));
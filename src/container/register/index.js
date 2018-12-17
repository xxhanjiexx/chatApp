import React, { Component } from 'react';
import {Button,List,InputItem,WhiteSpace,Radio}from 'antd-mobile';
import Logo from '../../component/logo';
import {Redirect} from'react-router-dom';
import {connect} from 'react-redux';
import {actioncreators} from '../../store/userStore';
import {reactForm} from "../../component/react-form";


class Register extends Component {

        state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }

    componentDidMount() {
        this.props.handleChange('type','genius');
    }
    handleRegister = () =>{
        this.props.register(this.props.state);
    }

    render() {
        const {redirectTo,msg}= this.props;
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {redirectTo ? <Redirect to={redirectTo}/>:null}
                <Logo/>
                <List>
                    {msg ? <p>{msg}</p> : null}
                    <InputItem
                        onChange={v=>this.props.handleChange('user',v)}
                    >用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type='password'
                        onChange={v=>this.props.handleChange('pwd',v)}
                    >密码</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type='password'
                        onChange={v=>this.props.handleChange('repeatpwd',v)}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem
                        checked={this.props.state.type==='genius'}
                        onChange={()=>this.props.handleChange('type','genius')}
                    >
                        天才
                    </RadioItem>
                    <RadioItem
                        checked={this.props.state.type==='boss'}
                        onChange={()=>this.props.handleChange('type','boss')}
                    >
                        BOSS
                    </RadioItem>
                    <WhiteSpace/>
                    <Button
                        onClick={this.handleRegister}
                    >注册</Button>
                </List>
            </div>
        );
    }
}

const MapStateToProps = (state)=> ({
    //console.log(state.userReducer.msg);
    //前面需要加上子reducer才能获取到Store的数据
        msg: state.userReducer.msg,
        redirectTo: state.userReducer.redirectTo
})

const MapDispatchToProps = (dispatch)=>({
    register(state){
        dispatch(actioncreators.register(state));
    }
})

export default reactForm(connect(MapStateToProps,MapDispatchToProps)(Register));
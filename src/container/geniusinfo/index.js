import React, { Component } from 'react';
import { NavBar , InputItem,TextareaItem,WhiteSpace,Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {actioncreators} from '../../store/userStore';
import AvatarSelector from '../../component/avatarselector';


class GeniusInfo extends Component {

    state = {
        title:'',
        desc:''
    }

    onChange(key,val){
        this.setState({
            [key]:val
        });
    }

    render(){
        const {redirectTo}= this.props;
        const path = this.props.location.pathname;
        return(
            <div>
                {redirectTo && redirectTo!==path ? <Redirect to={redirectTo}/>:null}
                <NavBar
                    mode="dark"
                >天才信息完善页面</NavBar>
                <AvatarSelector
                    selectAvatar = {(imgname)=>{
                        this.setState({
                            avatar:imgname
                        });
                    }}
                />
                <InputItem
                    onChange={(v)=>{this.onChange('title',v)}}
                >求职岗位</InputItem>
                <WhiteSpace/>
                <TextareaItem
                    onChange={(v)=>{this.onChange('desc',v)}}
                    rows={3}
                    autoHeight
                    title='个人简介'
                > </TextareaItem>
                <WhiteSpace/>
                <Button
                    type='primary'
                    onClick={()=>{this.props.update(this.state)}}
                >保存</Button>
            </div>
        )
    }
}

const MapStateToProps = (state)=>({
    redirectTo:state.userReducer.redirectTo
})

const MapDispatchToProps = (dispatch)=>({
    update(state){
        dispatch(actioncreators.update(state));
    }
})

export default connect(MapStateToProps,MapDispatchToProps)(GeniusInfo);
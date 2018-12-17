import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import  {connect} from 'react-redux';
import {actioncreators} from '../../store/userStore'

class AuthRoute extends Component {
    componentDidMount() {
        const publicList = ['/login','/register'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname)>-1){
            return null
        }
        //获取用户信息
        axios.get('/user/info')
            .then(res=>{
                if(res.status === 200){
                    if(res.data.code === 0){
                        //有登录信息
                        this.props.loaddata(res.data.data)
                    }else{
                        this.props.history.push('/login');
                    }
                    //console.log(res.data);
                }
            });
    }
    render(){
        return(
            <div>
            </div>
        );
    }
}

const MapDispatchToProps = (dispatch)=>({
    loaddata(state){
        dispatch(actioncreators.loadData(state))
    }
})

export default connect(null,MapDispatchToProps)(withRouter(AuthRoute));
import React, { Component } from 'react';
import UserCard from '../usercard'
import {connect} from 'react-redux';
import {actioncreators} from "../../store/chatuserstore";

class Boss extends Component{

    componentDidMount() {
        this.props.getUserList('genius');
    }
    render(){
        return(
            <UserCard userlist={this.props.userList}/>
        )
    }
}

const MapStateToProps = (state) =>({
    userList:state.chatuserReducer.userList
})

const MapDispatchToProps = (dispatch)=>({
    getUserList(state){
        dispatch(actioncreators.getUserList(state))
    }
})

export default connect(MapStateToProps,MapDispatchToProps)(Boss);

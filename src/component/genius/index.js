import React, { Component } from 'react';
import {connect} from 'react-redux';
import {actioncreators} from "../../store/chatuserstore";
import Index from "../usercard";

class Genius extends Component{

    componentDidMount() {
        this.props.getUserList('boss');
    }
    render(){
        return(
            <Index userlist={this.props.userList}/>
        )
    }
}

const MapStateToProps = (state) =>({
    userList:state.chatuserReducer.userList
})

const MapDispatchToProps = (dispatch)=>({
    getUserList(type){
        dispatch(actioncreators.getUserList(type))
    }
})

export default connect(MapStateToProps,MapDispatchToProps)(Genius);

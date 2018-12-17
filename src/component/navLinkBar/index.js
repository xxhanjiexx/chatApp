import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import { TabBar} from 'antd-mobile';
import {connect}from 'react-redux';


class NavLinkBar extends Component{
    static propTypes = {
        data:PropTypes.array.isRequired
    };

    render(){
        //console.log(this.props);//filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
        const navList = this.props.data.filter(v=>!v.hide);
        const {pathname} = this.props.location;
        return(
            <TabBar>
                {navList.map(v=>(
                    <TabBar.Item
                        badge={v.path==='/msg' ? this.props.unread :0}
                        key={v.path}
                        title={v.title}
                        icon={{uri:require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                        selected={pathname===v.path}
                        onPress={()=>{
                            this.props.history.push(v.path);
                        }}
                    >
                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }
}

const MapStateToProps=(state)=>({
    unread:state.chatReducer.unread
})

const MapDispatchToProps=(dispatch)=>({

})

export default connect(MapStateToProps,MapDispatchToProps)(withRouter(NavLinkBar));
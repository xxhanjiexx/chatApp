import React,{Component} from 'react';
import {connect} from 'react-redux';
import{List,Badge} from 'antd-mobile'

class Msg extends Component{
    getLast = (arr)=>{
        return arr[arr.length-1]
    }
    render(){
        const Item = List.Item;
        const Brief = Item.Brief;
        const msgGroup = {};
        const userid = this.props._id;
        this.props.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] ||[];
            msgGroup[v.chatid].push(v);
        })
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            return b_last-a_last
        });
        return(
            <div>

                    {chatList.map(v=> {
                        const lastItem = this.getLast(v);
                        const targetId = v[0].from === userid ? v[0].to:v[0].from;
                        const unreadNum = v.filter(v=>!v.read && v.to===userid).length;
                        //console.log(this.props.users)
                        if(!this.props.users[targetId]){
                            return null
                        }
                        // const name = this.props.users[targetId] ? this.props.users[targetId].name:'';
                        // const avatar = this.props.users[targetId] ? this.props.users[targetId].avatar:'';
                        return(
                            <List key={lastItem._id}>
                                <Item
                                    extra={<Badge text={unreadNum}/>}
                                    thumb={require(`../img/${this.props.users[targetId].avatar}.png`)}
                                    arrow='horizontal'
                                    onClick={()=>{
                                        this.props.history.push(`/chat/${targetId}`)
                                    }}
                                >
                                    {lastItem.content}
                                <Brief>{this.props.users[targetId].name}</Brief>
                            </Item>
                            </List>)
                    })}


            </div>
        )
    }
}

const MapStateToProps = (state)=>({
    chatmsg:state.chatReducer.chatmsg,
    _id:state.userReducer._id,
    users:state.chatReducer.users
})

export default connect(MapStateToProps,null)(Msg);
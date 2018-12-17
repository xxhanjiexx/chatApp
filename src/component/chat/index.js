import React,{Component} from 'react';
import io from 'socket.io-client';
import {InputItem, List,NavBar,Icon,Grid} from 'antd-mobile';
import {actioncreators} from '../../store/chatstore';
import {connect} from 'react-redux'
import '../../index.css';
import {getChatId} from "../../utils";
const socket =io('ws://localhost:9093');

class Chat extends Component{
    state = {
        text:'',
        msg:[]
    }

    componentDidMount() {
        if(!this.props.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }

    fixCarousel=()=>{
        setTimeout(()=>{
            window.dispatchEvent(new Event('resize'));
        },0)
    }

    handleSubmit = ()=>{
        // console.log(this.state.text);
        // console.log(this.state.msg);
        const from = this.props._id;// 发送人（用户唯一id值）
        const to = this.props.match.params.user;//接收人（获取URL参数）
        const msg = this.state.text;
        //console.log(from,to,msg);
        this.props.sendMsg({from,to,msg});//sendMsg函数需要接收发送人接收人跟消息
        this.setState({
            text:'',
            showEmoji:false
        });//发送完消息清除text
    }

    render(){
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v=>v)
            .map(v=>({text:v}));
        //console.log(this.props);{this.props.match.params.user}
        const userid = this.props.match.params.user;
        const Item = List.Item;
        const {users,_id} = this.props;
        if (!users[userid]){
            return null
        }
        const chatid = getChatId(userid, _id);
        const chatmsg = this.props.chatmsg.filter(v=>v.chatid===chatid)
        return(
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type='left'/>}
                    onLeftClick={()=>{
                        this.props.history.goBack();
                    }}
                    mode='dark'>
                    {users[userid].name}
                </NavBar>
                {chatmsg.map(v=> {
                    const avatar = require(`../img/${users[v.from].avatar}.png`);
                    return v.from === userid ?(
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>
                    ):(
                        <List key={v._id}>
                            <Item
                                extra={<img src={avatar} alt=''/>}
                                className='chat-me'>{v.content}</Item>
                        </List>
                    )
                })}
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入信息'
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight:15}}
                                        onClick={()=>{
                                            this.setState({showEmoji:!this.state.showEmoji});
                                            this.fixCarousel()}
                                        }
                                    >😃</span>
                                    <span onClick={this.handleSubmit}>发送</span>
                                </div>
                            }
                        />
                    </List>
                    {this.state.showEmoji ?
                        <Grid
                            data={emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={el=>{
                                this.setState({
                                    text:this.state.text + el.text
                                })
                            }}
                        /> :null}
                </div>
            </div>
        )
    }
}

const MapStateToProps=(state)=>({
    _id:state.userReducer._id,
    chatmsg:state.chatReducer.chatmsg,
    users:state.chatReducer.users
})

const MapDispatchToProps=(dispatch)=>({
    getMsgList(){
        dispatch(actioncreators.getMsgList());
    },
    sendMsg(data){
        dispatch(actioncreators.sendMsg(data))
    },
    recvMsg(){
        dispatch(actioncreators.recvMsg())
    }
})

export default connect(MapStateToProps,MapDispatchToProps)(Chat);
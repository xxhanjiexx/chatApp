import * as constants from './constants';
import axios from 'axios';
import io from "socket.io-client";
const socket =io('ws://localhost:9093');

const msgList = (msgs,users,userid)=>({
    type:constants.MSG_LIST,
    payload:{msgs,users,userid}
})

const msgRecv = (msg,userid)=>({
    type:constants.MSG_RECV,
    payload:msg,
    userid
})

export const getMsgList = ()=>{
    return (dispatch,getState)=>{
        axios.get('/user/getmsglist',)
            .then(res=>{
                //console.log(res)
                if (res.status === 200 && res.data.code===0){
                    const userid = getState().userReducer._id;
                    dispatch(msgList(res.data.msgs,res.data.users,userid))
                }
            })
    }
}

export const recvMsg = ()=>{
    return (dispatch,getState)=>{
        socket.on('recvMsg',(data)=>{
            const userid = getState().userReducer._id;
            //console.log('recvMsg',data);
            dispatch(msgRecv(data,userid));
        });
    }
}

export const sendMsg = ({from,to,msg})=>{
    return dispatch=>{
        socket.emit('sendMsg',{from,to,msg});
    }
}
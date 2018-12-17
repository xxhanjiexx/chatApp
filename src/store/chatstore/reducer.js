import * as constants from './constants';

const initState = {
    chatmsg:[],//聊天信息的所有记录
    unread:'',//未读消息的总条数
    users:{}
}

export default (state=initState,action)=>{
    switch (action.type) {
        case constants.MSG_LIST://                                   过滤掉已读信息
            return {...state,
                    users: action.payload.users,
                    chatmsg:action.payload.msgs,
                    unread:action.payload.msgs.filter(v=>!v.read&&v.to===action.payload.userid).length}
        case constants.MSG_RECV:
            const n = action.payload.to === action.userid ? 1:0;
            return {...state,
                    chatmsg:[...state.chatmsg,action.payload],
                    unread:state.unread+n}
        case constants.MSG_READ://                                     每接受一条消息加一个unread
            return
        default:
            return state
    }
}
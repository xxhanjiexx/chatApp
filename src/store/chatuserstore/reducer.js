import * as constants from './constants';

const initState= {
    userList: [],
}

export default (state=initState, action)=>{
    switch(action.type){
        case constants.USER_LIST:
            return {...state, userList:action.payload}
        default:
            return state
    }
}
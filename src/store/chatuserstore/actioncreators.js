import * as constants from './constants';
import axios from 'axios';

const userList = (data)=>({
    type:constants.USER_LIST,payload:data
})

export const getUserList = (type)=>{
    return dispatch=>{
        axios.get('/user/list?type='+type)
            .then(res=>{
                if (res.data.code===0){
                    dispatch(userList(res.data.data));
                }
            });
    }
}
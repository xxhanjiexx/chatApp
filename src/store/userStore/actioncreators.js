import * as constants from './constants';
import axios from 'axios';

export const authSuccess = (obj)=>{
    const {pwd,...data} = obj;
    return { type:constants.AUTH_SUCCESS, payload:data};
}

export const logoutSubmit=()=>({
    type:constants.LOGOUT
})


const errorMsg = (msg)=>{
    return { msg, type:constants.ERROR_MSG };
}

export const loadData = (userinfo)=>{
    //console.log(loadData);
    return { type:constants.LOAD_DATA, payload:userinfo};
}

export const register = ({user,pwd,repeatpwd,type})=>{
    return dispatch=>{
        if (!user||!pwd||!type) {
             dispatch(errorMsg('用户名密码必须输入'));
        }else if (pwd!==repeatpwd) {
             dispatch(errorMsg('密码和确认密码不同'));
        }else {
            axios.post('/user/register', {user, pwd, type})
                .then(res => {
                    //console.log(res)
                    if (res.status === 200 && res.data.code === 0) {
                        //console.log(user);
                        dispatch(authSuccess({user, pwd, type}));
                    } else {
                        dispatch(errorMsg(res.data.msg));
                    }
                });
        }
    }

}

export const login =({user,pwd})=>{

    return dispatch=> {
        if (!user || !pwd) {
            return dispatch(errorMsg('用户密码必须输入'));
        } else {
            axios.post('/user/login', {user, pwd})
                .then(res => {
                    if (res.status === 200 && res.data.code === 0) {
                        // dispatch(registerSuccess({user,pwd,type}))
                        dispatch(authSuccess(res.data.data));
                    } else {
                        dispatch(errorMsg(res.data.msg));
                    }
                })
        }
    }
}

export const update = (data)=>{
    return (dispatch)=>{
        axios.post('/user/update',data)
            .then((res)=>{
                if (res.status === 200 && res.data.code === 0) {
                    // dispatch(registerSuccess({user,pwd,type}))
                    dispatch(authSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}



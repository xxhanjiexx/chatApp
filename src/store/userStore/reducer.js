import * as constants from './constants';
import  {getRedirectPath} from '../../utils'

const initState={
    redirectTo:'',
    user:'',
    pwd:'',
    type:'',
    salary:''
}

export default (state=initState, action)=>{
    switch(action.type){
        case constants.AUTH_SUCCESS:
            return {...state, msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
        case constants.ERROR_MSG:
            return {...state, isAuth:false, msg:action.msg}
        case constants.LOAD_DATA:
            return {...state,...action.payload}
        case constants.LOGOUT:
            return  {...initState,redirectTo:'/login'}
        default:
            return state
    }
}
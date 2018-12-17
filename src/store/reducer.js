import {combineReducers} from 'redux';
import {reducer as userReducer} from './userStore';
import {reducer as chatuserReducer} from './chatuserstore';
import {reducer as chatReducer} from './chatstore';



const reducer = combineReducers({
    userReducer,
    chatuserReducer,
    chatReducer
});

export  default reducer;
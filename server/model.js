const mongoose = require('mongoose');//引入mongoose来操作mongodb
const DB_URL = 'mongodb://localhost:27017/react-chat';
mongoose.connect(DB_URL);//连接

const models={
    user :{
        'user':{'type':String,'require':true},
        'pwd':{'type':String,'require':true},
        'type':{'type':String,'require':true},
        //头像
        'avatar':{'type':String},
        //个人简介
        'desc':{'type':String},
        //职位名
        'title':{'type':String},
        //老板还有2个字段
        'company':{'type':String},
        'salary':{'type':String}
    },
    chat:{
        'chatid':{'type':String,'require':true},
        'from':{'type':String,'require':true},
        'to':{'type':String,'require':true},
        'read':{'type':Boolean,'default':false},
        'content':{'type':String,'require':true,'default':''},
        'create_time':{'type':Number,'default':new Date().getTime()}
    }
}

for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]));
    //schema是mongoose里会用到的一种数据模式，可以理解为表结构的定义，无法操作数据库
}

module.exports = {
    //定义好了Schema，接下就是生成Model。
    //model是由schema生成的模型，可以对数据库的操作
    getModel:function (name) {
        return mongoose.model(name)

    }
}

const express = require('express');
const Router = express.Router();
const utils = require('utility');//实现字符串加密
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = {'pwd':0,'__v':0};//显示条件
//Chat.remove({},(err,doc)=>{})//删除聊天记录
//get的参数用query获取
Router.get('/list',(req,res)=>{
    const {type} = req.query;
    //User.remove({},(err,doc)=>{});//清除所有数据
    User.find({type},(err,doc)=>{
        return res.json({code:0,data:doc});
    });
});
//post的参数用body获取
Router.post('/update',(req,res)=>{
    const userid = req.cookies.userid;
    if(!userid){
        return res.json({code:1})
    }
    const body = req.body;
    User.findByIdAndUpdate(userid,body,(err,doc)=>{
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body);//功能类似于es6的字符串拓展...，Object.assign后面的参数都会依次覆盖第一个
        return res.json({code:0,data})
    });
});

Router.post('/login',(req,res)=>{
    const {user,pwd} = req.body;
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,(err,doc)=>{
        if(!doc){
            return res.json({code:1,msg:'用户名或密码错误'});
        }
        res.cookie('userid',doc._id);
        return res.json({code:0,data:doc})
    });
});

Router.post('/register',(req,res)=>{
    //console.log(req.body);
    const{user,pwd,type} = req.body;
    User.findOne({user},(err,doc)=>{
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        const userModel = new User({user,type,pwd:md5Pwd(pwd)});//用create方法拿不到id
        userModel.save((err,doc)=>{
            if(err){
                return res.json({code:1,msg:'后端出错了'});
            }
            const {type,user,_id}= doc;
            res.cookie('userid',_id);
            return res.json({code:0,data:{type,user,_id}});
        });
    });
});

Router.get('/info',(req,res)=>{
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code:1});
    }
    User.findOne({_id:userid},_filter,(err,doc)=>{
        if(err){
            return res.json({code:1,msg:'后端出错了'});
        }
        if(doc){
            return res.json({code:0,data:doc});
        }
    });
});

Router.get('/getmsglist',(req,res)=>{
    const user =req.cookies.userid;
    User.find({},(err,userdoc)=>{
        let users={};
        userdoc.forEach(v=>{
            users[v._id] = {name:v.user,avatar:v.avatar}
        });
        Chat.find({'$or':[{from:user},{to:user}]},(err,doc)=>{
            if (!err){
                return res.json({code:0,msgs:doc,users:users})
            }
        });
    });
    // {'$or':[{from:user,to:user}]}
});

function md5Pwd (pwd){
    const salt = 'learning_react@!#45EW55~~';
    return utils.md5(utils.md5(pwd+salt))
}
//常用的md5加密方法


module.exports = Router;
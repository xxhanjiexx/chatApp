const express = require('express');
const bodyParser = require('body-parser');//对post请求的请求体进行解析
const cookieParser = require('cookie-parser');//实现cookie的解析
const model = require('./model');
const Chat = model.getModel('chat');
const userRouter = require('./user');
const app = express();
//将express跟io关联起来
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection',(socket)=>{
    socket.on('sendMsg',(data)=>{
        const {from,to,msg}=data;
        const chatid = [from,to].sort().join('_');//形成唯一的ID识别两个人的对话消息
        Chat.create({chatid,from,to,content:msg},(err,doc)=>{
            io.emit('recvMsg', Object.assign({},doc._doc));
            //console.log(doc._doc);
        });
        // console.log(data);
        // io.emit('recvMsg',data);
    });
    //console.log('user login');
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/user',userRouter);
//express跟io绑定起来
server.listen(9093,function () {
    console.log('Node app start at port 9093');
});
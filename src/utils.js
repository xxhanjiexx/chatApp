export function getRedirectPath  ({type,avatar}){
    let url = (type === 'boss') ? '/boss' : '/genius';
    if(!avatar){
        url += 'info'
    }
    return url
}

//控制页面跳转，是boss就跳转到boss页面，否则跳转到天才页面
// 如果没有头像，就跳转到完善信息页面

export function getChatId(userid , targetid) {
    return [userid , targetid].sort().join('_')
}
var express = require('express');
var router = express.Router();
var session = require('express-session')
var FileStore = require('session-file-store')(session);
var fs = require('fs');
var template = require('../lib/template.js');
var path = require('path');

module.exports= function(passport){
//LOGIN 
router.get('/login', function(request, response){
     //플래시 메시지 request.flash 로 들어옵니다. 
     var fmsg = request.flash();
     console.log('flash',fmsg);
     var feedback =''
     if(fmsg.error){
        feedback = fmsg.error[0]
     }
     
    var filelist = request.filelist;
    var title = 'WEB - login';
    var list = template.list(filelist)
    var html = template.html(title,list,`
    <div style="color:red">${feedback}<div>
    <form action="/auth/login_process"
        method="POST">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="password" placeholder="password"></p>

        <p><input type="submit" vlaue="login"></p>

        </form>
    
    `,'');
    response.send(html);
});

//LOGOUT 
router.get('/logout', function(request, response){
    //패스포트 로그아웃 
    request.logout();
    //세션 현재상태 저장후, 콜백 오면 리다이렉션 
    request.session.save(function(err){
        response.redirect('/');
    })
});

//LOGIN PROCESS with Passport Method is POST 
router.post('/login_process',
passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
    successFlash: 'logined!'
}));

    return router;

}


//module.exports = router;
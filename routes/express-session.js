var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var FileStore = require('session-file-store')(session);

var app = express()

//fileStore 에 session 저장
var fileStoreOptions = {};
 
app.use(session({
    secret: 'keyboard cat',
    resave: false,            //기본값으로 세팅 ,추후 필요하면 변경 
    saveUninitialized: true,  //기본값으로 세팅 ,추후 필요하면 변경 
    store: new FileStore(fileStoreOptions)
}));


//위의 app.use 로 인해 req 안에 session객체가 생기고 아래처럼 num을 할당하면 저장된다.  
app.get('/', function (req, res, next) {
  console.log(req.session);
  if(req.session.num === undefined){
    req.session.num = 1;
  } else {
    req.session.num =  req.session.num + 1;
  }
  res.send(`Views : ${req.session.num}`);
})


app.listen(3000, ()=>{
    console.log('server is running')
})

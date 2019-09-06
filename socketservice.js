const IO = require('socket.io');

let io = IO('197.253.19.76:8002',{
    query :{
      token : "59fj9439ewdi93"
    }
  })
  
  io.on('connection',()=>{
    console.log('connected')
  })
  
  io.on('message', (msg)=>{
    console.log(msg);
  })
  
  io.on('data',(data)=>{
    console.log(JSON.stringify(data));
  })
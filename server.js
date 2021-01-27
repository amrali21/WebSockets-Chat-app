const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req,res)=>{
  res.render('index.ejs')
})

server = app.listen(3000);


const io = require('socket.io')(server) // what is this?

io.on('connection',(socket)=>{     // when a user creates a new socket by connecting to the server?
  console.log('new user connected')

  socket.username = "Anonymous"

  socket.on('change_username', (data) => {
    console.log(data.username)
    socket.username = data.username;
  })


socket.on('new_message', (data) => {
    //broadcast the new message
    io.sockets.emit('new_message', {message : data.message, username : socket.username});
})

socket.on('typing', (data) => {
  socket.broadcast.sockets('typing', {username: socket  .username})
})

})

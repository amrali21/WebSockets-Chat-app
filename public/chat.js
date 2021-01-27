//THIS IS ALL JQUERY

$(function(){
  var socket = io.connect('http://localhost:3000')

  var username = $("#username")
  var message = $("#message")
  var send_username = $("#send_username")
  var send_message = $("#send_message")
  var chatroom = $("#chatroom")
  var feedback = $("#feedback")

  send_username.click(() => {
    console.log(username.val())
    socket.emit('change_username',{username: username.val()})  // emit to main socket
  });

  send_message.click(() => {
    console.log(message.val())
    socket.emit('new_message', {message: message.val()})  // emit to main socket
  });

  socket.on('new_message', (data) => {
    console.log("messssssssssageeeeee")
    chatroom.append("<p class = 'message'>" + data.username + ": " + data.message + "</p>")
  })

socket.bind("keypress", ()=>{
  socket.emit('typing')
})

socket.on('typing', (data) => {
  feedback.append("<p>" + data.username + " is typing" + "</p>")
})

});

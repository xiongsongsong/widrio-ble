var socket = io('http://localhost:3001');
socket.on('connect', function () {
  console.log('connect')
});
socket.on('event', function (data) {
  console.log('event', data)
});
socket.on('disconnect', function () {
  console.log('disconnect')
});
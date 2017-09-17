var socket = io('http://localhost:3001');
socket.on('connect', function () {
  console.log('connect')
});
socket.on('ble', function (data) {
  console.log(data)
});
socket.on('disconnect', function () {
  console.log('disconnect')
});
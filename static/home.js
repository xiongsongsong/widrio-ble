moment.locale('zh-cn');

/*
* 获取名称的最后两位
* */

Vue.filter('simple', (name) => {
  if (typeof name !== 'string') return name;
  name = parseInt(name.replace(/^(.+)(.{3})$/, '$2'), 10)
  if (name < 100) {
    return `输液室${name}号呼叫`
  }
  return name
})

const App = new Vue({
  el: '#app',
  data() {
    return {
      ble: []
    }
  },
  methods: {
    notify(data) {
      if (_.find(this.ble, (item) => item.name === data.name)) {
        return
      }
      this.ble.push(data)
    }
  }
})

var socket = io('http://localhost:3001');
socket.on('connect', function () {
  // console.log('connect')
});

socket.on('ble', function (data) {
  App.notify(data)
});
socket.on('disconnect', function () {
  console.log('disconnect')
});

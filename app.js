const Koa = require('koa')
const app = new Koa()
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server)
const serve = require('koa-static')
const noble = require('noble')
// CN0028001000001

const bleRe = /^CN[0-9a-f]{13}$/

app.use(serve(__dirname + '/node_modules'))
app.use(serve(__dirname + '/static'))

const Pug = require('koa-pug')
const pug = new Pug({
  viewPath: './view',
  debug: true,
  pretty: false,
  noCache: true,
  compileDebug: false,
  basedir: __dirname,
  helperPath: [
    {_: require('lodash')}
  ],
  app: app
})

app.use(ctx => {
  ctx.render('home')
});

app.listen(3000)
server.listen(3001)

io.on('connection', function () {
  //
});

/*
* 开始监听蓝牙
* */
noble.on('stateChange', function (state) {
  if (state === 'poweredOn') {
    noble.startScanning([], true, function (err, res) {
      //
    });
  }
});

noble.on('discover', function (peripheral) {
  let name = peripheral.advertisement.localName
  console.log(name)
  let data = peripheral.advertisement.manufacturerData.toString()
  if (!bleRe.test(name)) {
    return
  }
  io.emit('ble', {
    name,
    data
  })
});

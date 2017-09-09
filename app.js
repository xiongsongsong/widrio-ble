var noble = require('noble')


noble.on('stateChange', function (state) {
  console.log(state)
  if (state === 'poweredOn') {
    noble.startScanning([], true, function (err, res) {
      console.log(err, res)
    }); // particular UUID's
  }
});


noble.on('discover', function (peripheral) {
  if (peripheral.advertisement.localName !== '3ab87438') return;
  console.log('RSSI' + peripheral.rssi, peripheral.advertisement.localName);

  if (peripheral.advertisement.manufacturerData) {
    console.log('manufacturer data:', JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex')));
  }
  if (peripheral.advertisement.txPowerLevel !== undefined) {
    console.log('\tmy TX power level is:' + peripheral.advertisement.txPowerLevel);
  }
});

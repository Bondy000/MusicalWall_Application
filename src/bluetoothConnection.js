let options = {
    filters: [
        { services: ["0000ffe0-0000-1000-8000-00805f9b34fb"]},
        { namePrefix: 'BT' },
        { namePrefix: 'Wall'},
        { namePrefix: 'Guitar'}
    ],
    optionalServices: ['device_information']
}

document.querySelector('.tryBle').addEventListener('click', async function(){
    let device = await navigator.bluetooth.requestDevice(options);
    let server = await device.gatt.connect();
    let service = await server.getPrimaryService(0xffe0);
    let characteristic = await service.getCharacteristic(0xffe1);
    console.log(characteristic);
    console.log(characteristic.BluetoothCharacteristicProperties.write)
    console.log(characteristic);

});
//let device = await navigator.bluetooth.requestDevice(options);
/*let server = await device.gatt.connect();
let service = await server.getPrimaryService(0xff0f);
let characteristic = await service.getCharacteristic(0xfffc);
*/
radio.setGroup(69)
radio.setTransmitSerialNumber(true)
radio.setTransmitPower(7)

let sn = 0

basic.forever(() => {
    send()
    basic.pause(1 / 60)
    serial.writeValue("mySerialNumber", control.deviceSerialNumber())
})

function send() {
    radio.sendNumber(111)
}

radio.onReceivedNumber(function(receivedNumber: number) {
    let serialNumber = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    if (serialNumber === sn) {
        serial.writeNumber(receivedNumber)
    }
})

radio.onReceivedValue(function(name: string, value: number) {
    serial.writeValue(name, value)
})
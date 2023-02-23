function fadeOnce () {
    while (LoopOnce == true) {
        if (GoingForward) {
            if (brightness < 1024 - stepsize) {
                brightness += stepsize
            } else {
                brightness += stepsize
                GoingForward = false
            }
        } else {
            if (brightness > stepsize) {
                brightness += 0 - stepsize
            } else {
                brightness += 0 - stepsize
                GoingForward = true
                SendNext = true
                LoopOnce = false
            }
            plotCurrentNum(brightness % 25)
            basic.pause(1)
            pins.analogWritePin(AnalogPin.P0, brightness)
        }
    }
}
function playSound () {
    music.playSoundEffect(music.createSoundEffect(
    WaveShape.Square,
    randint(3, 20),
    randint(1, 3),
    255,
    randint(0, 100),
    2000,
    SoundExpressionEffect.Vibrato,
    InterpolationCurve.Curve
    ), SoundExpressionPlayMode.InBackground)
}
radio.onReceivedNumber(function (receivedNumber) {
    serialNumber = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    match = tool == receivedNumber
    player_index = players.indexOf(serialNumber)
    found = player_index >= 0
    if (match && !(found)) {
        players.push(serialNumber)
    }
    if (!(match) && found) {
        temp = players.removeAt(player_index)
    }
    players = [0]
    tool = randint(0, 5)
})
function plotCurrentNum (num: number) {
    basic.clearScreen()
    // shows a pixel based on it's current number
    led.plot(num % 5, Math.floor(num / 5))
}
input.onGesture(Gesture.Shake, function () {
	
})
let currentlyActive = false
let temp = 0
let found = false
let player_index = 0
let tool = 0
let match = false
let serialNumber = 0
let SendNext = false
let brightness = 0
let LoopOnce = false
let stepsize = 0
let GoingForward = false
let players: number[] = []
players = [0]
radio.setGroup(10)
radio.setTransmitSerialNumber(true)
GoingForward = true
stepsize = 4
basic.forever(function () {
    radio.sendNumber(tool)
    if (tool == 0) {
        currentlyActive = true
    } else {
        currentlyActive = false
    }
    if (currentlyActive) {
        // We willen dit maar één keer laten lopen
        currentlyActive = false
        playSound()
        LoopOnce = true
        fadeOnce()
        // We willen dit maar één keer laten lopen
        SendNext = false
    }
    basic.clearScreen()
    basic.pause(1000)
})

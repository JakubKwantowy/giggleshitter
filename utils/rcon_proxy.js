const ws = require('ws')
const net = require('net')

const RCON_TARGET = 'ws://localhost:8080/rcon'

const sv = net.createServer(sock => {
    const s = new ws.WebSocket(RCON_TARGET)

    s.on('close', () => sock.destroy())
    sock.on('close', () => s.close())

    s.on('open', () => {
        s.on('message', data => sock.write(data))
        sock.on('data', data => s.send(data))
    })
})

sv.listen(2222)

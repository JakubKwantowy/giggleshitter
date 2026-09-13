const net = require('net')

/**
 * @param {import('../serverobj')} serverobj 
 * @param {string} endpoint 
 * @param {string} address
 * @param {number} port
 */
module.exports = function(serverobj, endpoint, address, port) {
    serverobj.app.ws(endpoint, (ws, req) => {
        const con = net.createConnection({
            host: address,
            port
        })

        con.on('ready', () => {
            con.on('data', data => ws.send(data))
            con.on('close', () => ws.close())
            
            ws.on('message', data => con.write(data))
            ws.on('close', () => con.destroy())
        })
    })
}

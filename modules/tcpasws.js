// Giggleshitter TCP-as-WebSocket Module
// Copyright (C) 2026  JakubKwantowy

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

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

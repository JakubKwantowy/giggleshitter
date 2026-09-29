// Giggleshitter "The Wall" Module
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

const fs = require('fs')
const ejs = require('ejs')
const bodyParser = require('body-parser')

/**
 * @param {import('../serverobj')} serverobj 
 * @param {string} endpoint 
 * @param {string} ejsfile 
 */
module.exports = function(serverobj, endpoint, ejsfile) {
    const limit = 1024 * 1024 * 1024
    let thewall = ''

    serverobj.app.get(endpoint, (req, res) => {
        const target = serverobj.relPath(ejsfile)
        const raw = fs.readFileSync(target, { encoding: 'utf-8' })
        const rendered = ejs.render(raw, { thewall: (thewall ? thewall : 'The empty wall beckons...') })
        res.send(rendered)
    })

    serverobj.app.post(endpoint, bodyParser.urlencoded({ limit: '1kb' }))

    serverobj.app.post(endpoint, (req, res) => {
        res.redirect(endpoint)

        const data = String(req.body.thewall).replaceAll('\n', ' --- ').replaceAll(/[\x00-\x1f]/g, '')
        thewall += `${data}\n\n`
        thewall = thewall.slice(-limit)
    })
}

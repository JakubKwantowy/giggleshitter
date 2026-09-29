// Giggleshitter 404 Handler
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

const path = require('path')
const fs = require('fs')

/**
 * @param {import('../serverobj')} serverobj 
 */
module.exports = function(serverobj, file) {
    serverobj.app.use('/', (req, res) => {
        const target = path.join(__dirname, '..', file)
        const page = fs.readFileSync(target, { encoding: 'utf-8' })
        res.status(404).send(page)
    })
}

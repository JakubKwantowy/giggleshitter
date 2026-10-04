// Giggleshitter EJS File Module
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
const path = require('path')
const ejs = require('ejs')

/**
 * @param {import('../serverobj')} serverobj 
 * @param {string} endpoint 
 * @param {string} file 
 * @param {ejs.Data} data 
 */
module.exports = function(serverobj, endpoint, file, data = {}) {
    serverobj.app.use(endpoint, (req, res) => {
        const target = serverobj.relPath(file)
        const targetdir = path.dirname(target)
        const raw = fs.readFileSync(target, { encoding: 'utf-8' })
        const rendered = ejs.render(raw, { req, res, dir: targetdir, ...data })
        res.send(rendered)
    })
}

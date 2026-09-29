// Giggleshitter File Server Module
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
const ejs = require('ejs')

/**
 * @param {import('../serverobj')} serverobj 
 * @param {string} endpoint 
 * @param {string} dir 
 * @param {string} templatefile 
 */
module.exports = function(serverobj, endpoint, dir, templatefile) {
    const base = serverobj.relPath(dir)
    const template = fs.readFileSync(serverobj.relPath(templatefile), { encoding: 'utf-8' })

    serverobj.app.use(endpoint, (req, res, next) => {
        if(req.method !== 'GET') return next()
        const safe = decodeURIComponent(req.path).split('/').filter(v => v !== '..').join('/')
        const target = path.join(base, safe)

        try {
            const stat = fs.lstatSync(target)

            if(stat.isFile())
                return res.sendFile(target)

            if(stat.isDirectory()) {
                if(!req.originalUrl.endsWith('/')) return res.redirect(req.originalUrl + '/')
                const listing = fs.readdirSync(target, { withFileTypes: true })

                const rendered = ejs.render(template, { path: req.originalUrl, listing })
                res.send(rendered)
                return
            }
        } catch(e) { 
            console.warn('FileServer error:', e.message) 
        }

        next()
    })
}

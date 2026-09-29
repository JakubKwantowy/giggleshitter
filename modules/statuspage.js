// Giggleshitter Status Page Module
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

const ejs = require('ejs')

/**
 * @param {import('../serverobj')} serverobj 
 */
module.exports = function(serverobj, endpoint = '/giggleshitter') {
    serverobj.app.get(endpoint, (req, res) => {
        const template = `<!DOCTYPE html><html><head><title>GiggleShitter Status</title></head><body><h1>GiggleShitter is alive.</h1><h2>Loaded modules</h2><ul><% for(const m of modules) { %> <li> <b><%- m.name %></b> <% if(!m.args.length) { %> </li> <% continue } %> (<%- m.args.join(', ') %>) </li> <% } %></ul></body></html>`
        res.send(ejs.render(template, { modules: serverobj.modulelist }))
    })
}

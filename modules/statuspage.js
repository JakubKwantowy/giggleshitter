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

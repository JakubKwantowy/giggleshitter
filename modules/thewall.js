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

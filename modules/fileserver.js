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

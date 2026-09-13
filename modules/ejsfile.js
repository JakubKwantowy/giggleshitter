const express = require('express')
const fs = require('fs')
const ejs = require('ejs')

/**
 * @param {import('../serverobj')} serverobj 
 * @param {string} endpoint 
 * @param {string} file 
 */
module.exports = function(serverobj, endpoint, file) {
    serverobj.app.use(endpoint, (req, res) => {
        const target = serverobj.relPath(file)
        const raw = fs.readFileSync(target, { encoding: 'utf-8' })
        const rendered = ejs.render(raw, { req, res })
        res.send(rendered)
    })
}

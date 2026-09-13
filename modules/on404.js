const express = require('express')
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

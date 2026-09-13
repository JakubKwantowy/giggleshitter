const express = require('express')

/**
 * @param {import('../serverobj')} serverobj 
 */
module.exports = function(serverobj, endpoint = '/', dir = 'www') {
    serverobj.app.use(endpoint, express.static(serverobj.relPath(dir)))
}

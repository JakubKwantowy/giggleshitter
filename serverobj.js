const express = require('express')
const expressWS = require('express-ws')
const path = require('path')

/**
 * @param {Number} port 
 */
function ServerObject(port) {
    this.app = express()
    this.appws = expressWS(this.app)
    this.port = port
    /**
     * @type { {name: String, args: String[]}[] }
     */
    this.modulelist = []
}

ServerObject.prototype.listen = function() {
    this.app.listen(this.port, () => console.log('Server active on port', this.port, `(http://localhost:${this.port})`))
}

/**
 * @param {String} target 
 * @returns {String}
 */
ServerObject.prototype.relPath = function(target) {
    return target.startsWith('/') ? target : path.join(__dirname, target)
}

/**
 * @param {String} modname 
 */
ServerObject.prototype.loadModule = function(modname, ...modargs) {
    try {
        const mod = require(`./${path.join('modules', modname)}`)
        mod(this, ...modargs)
        this.modulelist.push({ name: modname, args: modargs })
        console.log('Loaded module', modname, modargs)
    } catch(e) {
        console.error(e)
    }
}

module.exports = ServerObject

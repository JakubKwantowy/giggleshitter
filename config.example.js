exports.EXPRESS_PORT = 8080

/**
 * @param {import('./serverobj')} serverobj 
 */
exports.startup = function(serverobj) {
    serverobj.loadModule('statuspage')
    serverobj.loadModule('www')
    serverobj.loadModule('tcpasws', '/rcon', 'localhost', 22) // Maybe remove this if don't want to forward your SSH server
    serverobj.loadModule('fileserver', '/files/', '/your/files/dir', 'res/files.ejs')
    serverobj.loadModule('on404', 'res/404.html')

    serverobj.listen()
}

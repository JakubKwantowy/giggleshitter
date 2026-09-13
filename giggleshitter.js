const ServerObject = require('./serverobj')
const config = require('./config')

const serverobj = new ServerObject(config.EXPRESS_PORT)

console.log('[ GiggleShitter Startup ]')
config.startup(serverobj)
console.log('[ Startup Complete ]')

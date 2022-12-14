//added 11/28/22 debug module to improve look and readability of logs
const debug = require('debug')
const log =  debug('RSTR-MGR')
module.exports = log.extend

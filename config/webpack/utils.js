const fs = require('fs')

const mkdir = d => !fs.existsSync(d) && fs.mkdirSync(d)

module.exports = { mkdir }

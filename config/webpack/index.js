if (process.env.NODE_ENV === 'production') {
  console.log('building for prod')
  module.exports = require('./prod')
} else {
  console.log('building for dev')
  module.exports = require('./dev')
}

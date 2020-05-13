
let str = 'http://localhost:3000'
if (process.env.NODE_ENV == 'development') {
  str = 'http://localhost:3000'
}

module.exports = str
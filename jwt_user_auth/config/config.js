module.exports = {
  server: {
    host: 'localhost',
    port: 3003
  },

  database: {
    host: 'localhost',
    port: 27017,
    db: '/jwt',
    url: 'mongodb://127.0.0.1:'
  },

  key: {
    privateKey: 'idlbcxlcslpmqnfakftw',
    tokenExpiry: 1 * 30 * 1000 * 60 //1 hour
  },
}
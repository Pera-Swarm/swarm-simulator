module.exports = {
   config:{
      baseURL: 'http://' + process.env.HTTP_HOST+ ':' + process.env.HTTP_PORT,
      timeout: 1000,
      headers: {'X-Custom-Header': 'foobar'}
   }
}

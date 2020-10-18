module.exports = {
   config:{
      baseURL: 'http://' + (process.env.HTTP_HOST || 'localhost') + ':' + (process.env.HTTP_PORT || 8080),
      timeout: 1000,
      headers: {'X-Custom-Header': 'foobar'}
   }
}

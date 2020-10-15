const axios = require('axios');
const url = 'http://' + process.env.HTTP_HOST + ':' + process.env.HTTP_PORT;

module.exports.registerID = (callbackwithId) =>{
    axios.get(url)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // Publish ID
        callbackwithId('SOME_ID');
        console.log('ID Registered to Swarm!');
      });
}

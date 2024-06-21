const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Twitter Clone API',
    description: 'API Documentation for Twitter Clone'
  },
  host: 'localhost:5000',
  schemes: ['http']
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./bin/www'); // Your project's root file
});

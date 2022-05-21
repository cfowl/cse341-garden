const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Garden API',
    description: 'Chris Fowler\'s Personal Project for CSE341',
  },
  host: 'cfowl-garden.herokuapp.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
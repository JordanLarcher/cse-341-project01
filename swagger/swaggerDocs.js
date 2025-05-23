const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
            description: 'API for managing Contacts'
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: [path.join(__dirname, '../routes/*.js')],
};

module.exports = swaggerJsdoc(swaggerOptions);

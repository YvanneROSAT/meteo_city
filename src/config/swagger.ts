import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Météo',
      version: '1.0.0',
      description: 'API pour obtenir les informations météorologiques des villes',
      contact: {
        name: 'Support API',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3009',
        description: 'Serveur de développement'
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/types/*.ts']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec; 
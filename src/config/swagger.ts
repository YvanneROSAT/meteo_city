import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3009;

const servers = isProduction
  ? [{ url: '/', description: 'Serveur de production' }]
  : [{ url: `http://localhost:${port}`, description: 'Serveur de développement' }];

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
    servers
  },
  apis: [
    path.join(__dirname, '../routes/*.{ts,js}'),
    path.join(__dirname, '../controllers/*.{ts,js}'),
    path.join(__dirname, '../types/*.{ts,js}')
  ]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec; 
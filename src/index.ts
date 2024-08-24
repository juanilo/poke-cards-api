import express from 'express';
import cors from 'cors';
import routes from './routes/index.routes';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerJsdocOptions from './../swagger.json';

import errorHandlerMiddleware from './middlewares/errorHandler.middleware';
import { notFound } from './controllers/index.controllers';

const swaggerDocument = swaggerJsdoc(swaggerJsdocOptions);

const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/cards/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', routes);
app.use('*', notFound);

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Card API service is running on port ${port}...`);
});

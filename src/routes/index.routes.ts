import { Router } from 'express';
import {
  deleteCard,
  getCardById,
  getCards,
  postCard,
  putCard,
  getFightResult,
  getWeaknesses,
  getResistances,
  getAllNames,
  notFound,
} from '../controllers/index.controllers';
import { schemaValidation } from '../middlewares/schemaValidator.middleware';
import { validateRequestIdParam, validateRequestBody } from '../middlewares/requestsValidator.middleware';
import { PokemonCardSchema, PokemonCardSchemaUpdate } from '../schemas/card.schema';

const router = Router();

router.get('/cards', getCards);
router.get('/cards/names', getAllNames);
router.get('/cards/:id', validateRequestIdParam, getCardById);
router.post('/cards', validateRequestBody, schemaValidation(PokemonCardSchema), postCard);
router.put('/cards/:id', validateRequestIdParam, schemaValidation(PokemonCardSchemaUpdate), putCard);
router.delete('/cards/:id', validateRequestIdParam, deleteCard);
router.post('/cards/:id/attack', validateRequestIdParam, validateRequestBody, getFightResult);
router.get('/cards/:id/weaknesses', validateRequestIdParam, getWeaknesses);
router.get('/cards/:id/resistances', validateRequestIdParam, getResistances);
router.get('*', notFound);

export default router;

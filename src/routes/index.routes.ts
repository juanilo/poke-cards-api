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
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.get('/cards', authenticateToken, getCards);
router.get('/cards/names', authenticateToken, getAllNames);
router.get('/cards/:id', authenticateToken, validateRequestIdParam, getCardById);
router.post('/cards', authenticateToken, validateRequestBody, schemaValidation(PokemonCardSchema), postCard);
router.put('/cards/:id', authenticateToken, validateRequestIdParam, schemaValidation(PokemonCardSchemaUpdate), putCard);
router.delete('/cards/:id', authenticateToken, validateRequestIdParam, deleteCard);
router.post('/cards/:id/attack', authenticateToken, validateRequestIdParam, validateRequestBody, getFightResult);
router.get('/cards/:id/weaknesses', authenticateToken, validateRequestIdParam, getWeaknesses);
router.get('/cards/:id/resistances', authenticateToken, validateRequestIdParam, getResistances);
router.get('*', notFound);

export default router;

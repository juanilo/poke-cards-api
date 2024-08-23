'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const index_controllers_1 = require('../controllers/index.controllers');
const schemaValidator_middleware_1 = require('../middlewares/schemaValidator.middleware');
const requestsValidator_middleware_1 = require('../middlewares/requestsValidator.middleware');
const card_schema_1 = require('../schemas/card.schema');
const router = (0, express_1.Router)();
router.get('/cards', index_controllers_1.getCards);
router.get('/cards/names', index_controllers_1.getAllNames);
router.get('/cards/:id', requestsValidator_middleware_1.validateRequestIdParam, index_controllers_1.getCardById);
router.post(
  '/cards',
  requestsValidator_middleware_1.validateRequestIdParam,
  requestsValidator_middleware_1.validateRequestBody,
  (0, schemaValidator_middleware_1.schemaValidation)(card_schema_1.PokemonCardSchema),
  index_controllers_1.postCard,
);
router.put(
  '/cards/:id',
  requestsValidator_middleware_1.validateRequestIdParam,
  (0, schemaValidator_middleware_1.schemaValidation)(card_schema_1.PokemonCardSchemaUpdate),
  index_controllers_1.putCard,
);
router.delete('/cards/:id', requestsValidator_middleware_1.validateRequestIdParam, index_controllers_1.deleteCard);
router.post(
  '/cards/:id/attack',
  requestsValidator_middleware_1.validateRequestIdParam,
  index_controllers_1.getFightResult,
);
router.get(
  '/cards/:id/weaknesses',
  requestsValidator_middleware_1.validateRequestIdParam,
  index_controllers_1.getWeaknesses,
);
router.get(
  '/cards/:id/resistances',
  requestsValidator_middleware_1.validateRequestIdParam,
  index_controllers_1.getResistances,
);
exports.default = router;

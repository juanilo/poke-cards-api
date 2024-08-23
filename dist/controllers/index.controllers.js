'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getWeaknesses =
  exports.getResistances =
  exports.getFightResult =
  exports.deleteCard =
  exports.putCard =
  exports.postCard =
  exports.getAllNames =
  exports.getCardById =
  exports.getCards =
    void 0;
const cards_model_1 = require('../model/cards.model');
// GET /cards
const getCards = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let { limit, page, name, ability, type } = req.query;
    const filters = {};
    if (name) {
      filters.name = String(name);
    }
    if (ability) {
      filters.ability = String(ability);
    }
    if (type) {
      filters.type = String(type);
    }
    if (limit && +limit < 1) {
      return res.status(404).json({ message: 'Limit must be positive.' });
    }
    if (page && +page < 1) {
      return res.status(404).json({ message: 'Page must be positive.' });
    }
    const results = yield (0, cards_model_1.findAll)(limit ? +limit : 99, page ? +page : 1, filters);
    res.status(200).json(results);
  });
exports.getCards = getCards;
// GET /cards/:id
const getCardById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { rows: cards, rowCount: count } = yield (0, cards_model_1.findById)(req.params.id);
    if (count === 0) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.status(200).json(cards.at(0));
  });
exports.getCardById = getCardById;
// GET /cards/names
const getAllNames = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { rows: names, rowCount: count } = yield (0, cards_model_1.findAllNames)();
    res.status(200).json(names);
  });
exports.getAllNames = getAllNames;
// POST /cards
const postCard = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield (0, cards_model_1.create)(req.body);
    res.status(201).json({ message: 'Card successfully created' });
  });
exports.postCard = postCard;
// PUT /cards/:id
const putCard = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { rowCount: count } = yield (0, cards_model_1.update)(req.body, req.params.id);
    if (count === 0) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.status(200).json({ message: 'Card updated successfully' });
  });
exports.putCard = putCard;
// DELETE /cards/:id
const deleteCard = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { rowCount: count } = yield (0, cards_model_1.remove)(req.params.id);
    if (count === 0) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.status(200).json({ message: 'Card deleted successfully' });
  });
exports.deleteCard = deleteCard;
// GET /cards/:id/attack'
const getFightResult = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { rows: attackerCards, rowCount: attackerCardCount } = yield (0, cards_model_1.findById)(req.params.id);
    const { rows: targetCards, rowCount: targetCardCount } = yield (0, cards_model_1.findById)(req.body.targetId);
    if (attackerCardCount === 0 || targetCardCount === 0) {
      return res.status(404).json({ message: `Attacker/Target card not found` });
    }
    const attackerCard = attackerCards.at(0);
    const targetCard = targetCards.at(0);
    const attack = attackerCard.attacks.filter((a) => a.id == req.body.attackId).at(0);
    if (!attack) {
      return res.status(406).json({ message: 'Attack not found' });
    }
    const results = yield (0, cards_model_1.battle)(attackerCard, attack, targetCard);
    res.status(200).json(results);
  });
exports.getFightResult = getFightResult;
// GET /cards/:id/resistances
const getResistances = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { rows: cards, rowCount: count } = yield (0, cards_model_1.findById)(req.params.id);
    if (count === 0) {
      return res.status(404).json({ message: 'Card not found' });
    }
    const { rows: resistances } = yield (0, cards_model_1.resistancesTo)(cards.at(0));
    res.status(200).json({ result: resistances });
  });
exports.getResistances = getResistances;
// GET /cards/:id/weaknesses
const getWeaknesses = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { rows: cards, rowCount: count } = yield (0, cards_model_1.findById)(req.params.id);
    if (count === 0) {
      return res.status(404).json({ message: 'Card not found' });
    }
    const { rows: resistances } = yield (0, cards_model_1.weaknessTo)(cards.at(0));
    res.status(200).json({ result: resistances });
  });
exports.getWeaknesses = getWeaknesses;

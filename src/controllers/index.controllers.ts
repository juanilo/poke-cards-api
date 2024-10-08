import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { QueryResult } from 'pg';
import {
  findById,
  battle,
  resistancesTo,
  weaknessTo,
  create,
  update,
  remove,
  findAll,
  findAllNames,
} from '../model/cards.model';
import { AttackType, FilterType, PokemonCard } from '../types/index';

const SECRET = process.env.ACCESS_TOKEN_SECRET || '';

if (SECRET === '') {
  console.log('ACCESS_TOKEN_SECRET is not defined');
}

// GET /login
export const login = async (req: Request, res: Response) => {
  const username = req.body?.username || '';
  const user = { name: username };

  const accessToken = jwt.sign(user, SECRET);

  res.json({ accessToken });
}

// GET /cards
export const getCards = async (req: Request, res: Response) => {
  let { limit, page, name, ability, type } = req.query;

  const filters: FilterType = {};

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

  const results = await findAll(limit ? +limit : 99, page ? +page : 1, filters);
  res.status(200).json(results);
};

// GET /cards/:id
export const getCardById = async (req: Request, res: Response) => {
  const { rows: cards, rowCount: count } = await findById(req.params.id);

  if (count === 0) {
    return res.status(404).json({ message: 'Card not found' });
  }

  res.status(200).json(cards.at(0));
};

// GET /cards/names
export const getAllNames = async (_req: Request, res: Response) => {
  const { rows: names } = await findAllNames();

  res.status(200).json(names);
};

// POST /cards
export const postCard = async (req: Request, res: Response) => {
  console.log('POST /cards', req.body);
  await create(req.body);
  res.status(201).json({ message: 'Card successfully created' });
};

// PUT /cards/:id
export const putCard = async (req: Request, res: Response) => {
  const { rowCount: count }: QueryResult = await update(req.body, req.params.id);

  if (count === 0) {
    return res.status(404).json({ message: 'Card not found' });
  }

  res.status(200).json({ message: 'Card updated successfully' });
};

// DELETE /cards/:id
export const deleteCard = async (req: Request, res: Response) => {
  const { rowCount: count }: QueryResult = await remove(req.params.id);

  if (count === 0) {
    return res.status(404).json({ message: 'Card not found' });
  }

  res.status(200).json({ message: 'Card deleted successfully' });
};

// GET /cards/:id/attack'
export const getFightResult = async (req: Request, res: Response) => {
  const { rows: attackerCards, rowCount: attackerCardCount } = await findById(req.params.id);
  const { rows: targetCards, rowCount: targetCardCount } = await findById(req.body.targetId);

  if (attackerCardCount === 0 || targetCardCount === 0) {
    return res.status(404).json({ message: `Attacker/Target card not found` });
  }

  const attackerCard: PokemonCard = attackerCards.at(0);
  const targetCard: PokemonCard = targetCards.at(0);
  const attack: AttackType | undefined = attackerCard.attacks.filter((a) => a.id == req.body.attackId).at(0);

  if (!attack) {
    return res.status(406).json({ message: 'Attack not found' });
  }

  const results = await battle(attackerCard, attack, targetCard);

  res.status(200).json(results);
};

// GET /cards/:id/resistances
export const getResistances = async (req: Request, res: Response) => {
  const { rows: cards, rowCount: count } = await findById(req.params.id);

  if (count === 0) {
    return res.status(404).json({ message: 'Card not found' });
  }

  const { rows: resistances } = await resistancesTo(cards.at(0));

  res.status(200).json({ result: resistances });
};

// GET /cards/:id/weaknesses
export const getWeaknesses = async (req: Request, res: Response) => {
  const { rows: cards, rowCount: count } = await findById(req.params.id);

  if (count === 0) {
    return res.status(404).json({ message: 'Card not found' });
  }

  const { rows: resistances } = await weaknessTo(cards.at(0));

  res.status(200).json({ result: resistances });
};

// GET *
export const notFound = async (_req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
};

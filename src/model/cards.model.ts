import { connection } from '../database/database';
import { QueryResult } from 'pg';

import { PokemonCard, AttackType, AbilityType, ResultType } from '../types';

export const count = async () => {
  const response: QueryResult = await connection.query('SELECT COUNT(*) FROM cards');
  return response;
}

export const findAll = async (limit: number, page: number ) => {
  const query = 'SELECT * FROM cards LIMIT $1 OFFSET $2';
  const offset = (page - 1) * limit;
  const params = [limit, offset];
  const response: QueryResult = await connection.query(query, params);
  return response;
};

export const findById = async (id: string) => {
  const response: QueryResult = await connection.query('SELECT * FROM cards WHERE id = $1', [id]);
  return response;
};

export const findAllNames = async () => {
  const response: QueryResult = await connection.query('SELECT id, name FROM cards');
  return response;
};

export const create = async (cardData: PokemonCard) => {
  const { name, type, image_url, hp, attacks, rarity, resistance, weakness } = cardData;
  const response = await connection.query(
    'INSERT INTO cards (\
                    name, \
                    type, \
                    image_url, \
                    hp, \
                    attacks,\
                    rarity, \
                    resistance, \
                    weakness \
                )\
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [name, type, image_url, hp, JSON.stringify(attacks), rarity, JSON.stringify(resistance), JSON.stringify(weakness)],
  );
  return response;
};

export const update = async (cardData: PokemonCard, id: string | number) => {
  const { name, type, image_url, hp, attacks, rarity, resistance, weakness } = cardData;

  const query =
    'UPDATE cards SET ' +
    (name ? `name = '${name}', ` : '') +
    (type ? `type = '${type}', ` : '') +
    (image_url ? `image_url = '${image_url}', ` : '') +
    (hp ? `hp = '${hp}', ` : '') +
    (attacks ? `attacks = '${JSON.stringify(attacks)}', ` : '') +
    (rarity ? `rarity = '${rarity}', ` : '') +
    (resistance ? `resistance = '${JSON.stringify(resistance)}', ` : '') +
    (weakness ? `weakness = '${JSON.stringify(weakness)}' ` : '') +
    'WHERE id = ' +
    id;

  return connection.query(query.replace(', WHERE', ' WHERE'));
};

export const remove = async (id: string | number) => {
  return connection.query('DELETE FROM cards WHERE id = $1', [id]);
};

export const battle = (attackerCard: PokemonCard, attack: AttackType, targetCard: PokemonCard) => {
  // LOgIC APPLIED: if the weaknesses of target card is matched with any ability of the attack the damage
  // is multiplied by the weaknes value from the target,
  // if any of the abilities of the attack match the resistance type of the target,
  // the damage is reduced by the resistance value.
  const damageMultiplier = attackerCard.weakness.value;
  const attackAbilities = new Set<AbilityType>(attack.abilities.map((ability) => ability.type));
  const resistance = attackAbilities.has(targetCard.resistance.type) ? targetCard.resistance.value : 0;
  const damage = attack.damage * (attackAbilities.has(targetCard.weakness.type) ? damageMultiplier : 1) - resistance;

  return {
    card: attackerCard.name,
    attackTo: targetCard.name + ' (' + targetCard.hp + ' HP)',
    originalAttack: attack.damage,
    attackModified: damage,
    succeed: targetCard.hp - damage > 0 ? false : true,
  } as ResultType;
};

export const resistancesTo = async (card: PokemonCard) => {
  const resistance = card.resistance.type;
  return await connection.query(`SELECT * FROM cards WHERE attacks @> '[{"abilities": [{"type": "$1"}]}]'`, [
    resistance,
  ]);
};

export const weaknessTo = async (card: PokemonCard) => {
  const weakness = card.weakness.type;
  return await connection.query(`SELECT * FROM cards WHERE attacks @> '[{"abilities": [{"type": "$1"}]}]'`, [weakness]);
};

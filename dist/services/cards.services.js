"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.weaknessTo = exports.resistancesTo = exports.battle = exports.remove = exports.update = exports.create = exports.findAllNames = exports.findById = exports.findAll = void 0;
const database_1 = require("../database/database");
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.connection.query('SELECT * FROM cards');
    return response;
});
exports.findAll = findAll;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.connection.query('SELECT * FROM cards WHERE id = $1', [id]);
    return response;
});
exports.findById = findById;
const findAllNames = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.connection.query('SELECT id, name FROM cards');
    return response;
});
exports.findAllNames = findAllNames;
const create = (cardData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, type, image_url, hp, attacks, rarity, resistance, weakness } = cardData;
    const response = yield database_1.connection.query('INSERT INTO cards (\
                    name, \
                    type, \
                    image_url, \
                    hp, \
                    attacks,\
                    rarity, \
                    resistance, \
                    weakness \
                )\
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [name, type, image_url, hp, JSON.stringify(attacks), rarity, JSON.stringify(resistance), JSON.stringify(weakness)]);
    return response;
});
exports.create = create;
const update = (cardData, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, type, image_url, hp, attacks, rarity, resistance, weakness } = cardData;
    const query = 'UPDATE cards SET ' +
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
    return database_1.connection.query(query.replace(', WHERE', ' WHERE'));
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.connection.query('DELETE FROM cards WHERE id = $1', [id]);
});
exports.remove = remove;
const battle = (attackerCard, attack, targetCard) => {
    // LOgIC APPLIED: if the weaknesses of target card is matched with any ability of the attack the damage
    // is multiplied by the weaknes value from the target,
    // if any of the abilities of the attack match the resistance type of the target,
    // the damage is reduced by the resistance value.
    const damageMultiplier = attackerCard.weakness.value;
    const attackAbilities = new Set(attack.abilities.map((ability) => ability.type));
    const resistance = attackAbilities.has(targetCard.resistance.type) ? targetCard.resistance.value : 0;
    const damage = attack.damage * (attackAbilities.has(targetCard.weakness.type) ? damageMultiplier : 1) - resistance;
    return {
        card: attackerCard.name,
        attackTo: targetCard.name + ' (' + targetCard.hp + ' HP)',
        originalAttack: attack.damage,
        attackModified: damage,
        succeed: targetCard.hp - damage > 0 ? false : true,
    };
};
exports.battle = battle;
const resistancesTo = (card) => __awaiter(void 0, void 0, void 0, function* () {
    const resistance = card.resistance.type;
    return yield database_1.connection.query(`SELECT * FROM cards WHERE attacks @> '[{"abilities": [{"type": "$1"}]}]'`, [
        resistance,
    ]);
});
exports.resistancesTo = resistancesTo;
const weaknessTo = (card) => __awaiter(void 0, void 0, void 0, function* () {
    const weakness = card.weakness.type;
    return yield database_1.connection.query(`SELECT * FROM cards WHERE attacks @> '[{"abilities": [{"type": "$1"}]}]'`, [weakness]);
});
exports.weaknessTo = weaknessTo;

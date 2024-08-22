"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonCardSchemaUpdate = exports.PokemonCardSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("./../types");
const abilitySchema = zod_1.z.enum([
    types_1.AbilityType.Water,
    types_1.AbilityType.Fire,
    types_1.AbilityType.Grass,
    types_1.AbilityType.Electric,
    types_1.AbilityType.Ice,
    types_1.AbilityType.Poison,
    types_1.AbilityType.Ground,
    types_1.AbilityType.Flying,
    types_1.AbilityType.Psychic,
    types_1.AbilityType.Bug,
    types_1.AbilityType.Rock,
    types_1.AbilityType.Steel,
    types_1.AbilityType.Dragon,
    types_1.AbilityType.Dark,
    types_1.AbilityType.Fairy,
]);
const pokemonTypeSchema = zod_1.z.enum([
    types_1.PokemonType.Basic,
    types_1.PokemonType.Legendary,
    types_1.PokemonType.StageI,
    types_1.PokemonType.StageII,
]);
const RaritySchema = zod_1.z.enum([types_1.RarityType.Common, types_1.RarityType.Uncommon, types_1.RarityType.Rare]);
const abilityTupleSchema = zod_1.z.object({
    type: abilitySchema,
    value: (0, zod_1.number)(),
});
const attackSchema = zod_1.z.object({
    name: zod_1.z.string(),
    damage: zod_1.z.number(),
    abilities: zod_1.z.array(abilityTupleSchema),
});
exports.PokemonCardSchema = zod_1.z.object({
    name: zod_1.z.string(),
    type: zod_1.z.string(),
    image_url: zod_1.z.string().url(),
    hp: zod_1.z.number().int().positive(),
    attacks: zod_1.z.array(attackSchema),
    rarity: RaritySchema,
    resistance: abilityTupleSchema,
    weakness: abilityTupleSchema,
});
exports.PokemonCardSchemaUpdate = zod_1.z.object({
    name: zod_1.z.string().optional(),
    type: pokemonTypeSchema.optional(),
    image_url: zod_1.z.string().url().optional(),
    hp: zod_1.z.number().int().positive().optional(),
    attacks: zod_1.z.array(attackSchema).optional(),
    rarity: RaritySchema.optional(),
    resistance: abilityTupleSchema.optional(),
    weakness: abilityTupleSchema.optional(),
});

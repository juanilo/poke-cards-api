import { number, z } from 'zod';
import { AbilityType, RarityType, PokemonType } from './../types';

const abilitySchema = z.enum([
  AbilityType.Water,
  AbilityType.Fire,
  AbilityType.Grass,
  AbilityType.Electric,
  AbilityType.Ice,
  AbilityType.Poison,
  AbilityType.Ground,
  AbilityType.Flying,
  AbilityType.Psychic,
  AbilityType.Bug,
  AbilityType.Rock,
  AbilityType.Steel,
  AbilityType.Dragon,
  AbilityType.Dark,
  AbilityType.Fairy,
]);

const pokemonTypeSchema = z.enum([PokemonType.Basic, PokemonType.Legendary, PokemonType.StageI, PokemonType.StageII]);

const RaritySchema = z.enum([RarityType.Common, RarityType.Uncommon, RarityType.Rare]);

const abilityTupleSchema = z.object({
  type: abilitySchema,
  value: number(),
});

const attackSchema = z.object({
  name: z.string(),
  damage: z.number(),
  abilities: z.array(abilityTupleSchema),
});

export const PokemonCardSchema = z.object({
  name: z.string(),
  type: z.string(),
  image_url: z.string().url(),
  hp: z.number().int().positive(),
  attacks: z.array(attackSchema),
  rarity: RaritySchema,
  resistance: abilityTupleSchema,
  weakness: abilityTupleSchema,
});

export const PokemonCardSchemaUpdate = z.object({
  name: z.string().optional(),
  type: pokemonTypeSchema.optional(),
  image_url: z.string().url().optional(),
  hp: z.number().int().positive().optional(),
  attacks: z.array(attackSchema).optional(),
  rarity: RaritySchema.optional(),
  resistance: abilityTupleSchema.optional(),
  weakness: abilityTupleSchema.optional(),
});

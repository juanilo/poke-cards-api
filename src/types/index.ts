export enum AbilityType {
  Water = 'Water',
  Fire = 'Fire',
  Grass = 'Grass',
  Electric = 'Electric',
  Ice = 'Ice',
  Poison = 'Poison',
  Ground = 'Ground',
  Flying = 'Flying',
  Psychic = 'Psychic',
  Bug = 'Bug',
  Rock = 'Rock',
  Steel = 'Steel',
  Dragon = 'Dragon',
  Dark = 'Dark',
  Fairy = 'Fairy',
}

export type Ability = {
  type: AbilityType;
  value: number;
};

export type AttackType = {
  id: string;
  name: string;
  damage: number;
  abilities: Array<Ability>;
};

export enum RarityType {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
}

export enum PokemonType {
  Basic = 'Basic',
  Legendary = 'Legendary',
  StageI = 'Stage I',
  StageII = 'Stage II',
}

export type PokemonCard = {
  id: string;
  name: string;
  type: PokemonType;
  image_url: string;
  hp: number;
  attacks: Array<AttackType>;
  rarity: RarityType;
  resistance: Ability;
  weakness: Ability;
};

export type ResultType = {
  card: string;
  attackTo: string;
  originalAttack: number;
  attackModified: number;
  succeed: boolean;
};

export type FilterType = {
  name?: string;
  ability?: string;
  type?: string;
};

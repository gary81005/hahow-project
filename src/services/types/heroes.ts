export interface Hero {
  id: string;
  name: string;
  image: string;
}

export interface Abilities {
  str: number;
  int: number;
  agi: number;
  luk: number;
}

export interface updateHeroProfileTypes {
  heroId: string;
  abilities: Abilities;
}

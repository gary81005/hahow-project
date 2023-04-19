export interface Hero {
  id: string;
  name: string;
  image: string;
}

export interface Abilities {
  [x: string]: number;
}

export interface updateHeroProfileTypes {
  heroId: string;
  abilities: Abilities;
}

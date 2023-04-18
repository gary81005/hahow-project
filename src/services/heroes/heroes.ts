import axios from 'axios';
import { updateHeroProfileTypes } from '../types';

export function getHeroesList<T>() {
  return axios<T>({
    url: 'https://hahow-recruit.herokuapp.com/heroes',
    method: 'GET',
  });
}

export function getHeroProfile(heroId: string) {
  return axios({
    url: `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`,
    method: 'GET',
  });
}

export function updateHeroProfile({ heroId, abilities }: updateHeroProfileTypes) {
  return axios({
    url: `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`,
    method: 'PATCH',
    data: abilities,
  });
}

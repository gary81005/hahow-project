import axios from 'axios';
import { updateHeroProfileTypes } from '../types';

// Get Heroes List
export function getHeroesList<T>(controller: AbortController) {
  return axios<T>({
    url: 'https://hahow-recruit.herokuapp.com/heroes',
    method: 'GET',
    signal: controller.signal,
  });
}

// Get single hero profile
export function getHeroProfile<T>(heroId: string, controller: AbortController) {
  return axios<T>({
    url: `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`,
    method: 'GET',
    signal: controller.signal,
  });
}

// Update single hero profile
export function updateHeroProfile({ heroId, abilities }: updateHeroProfileTypes) {
  return axios({
    url: `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`,
    method: 'PATCH',
    data: abilities,
  });
}

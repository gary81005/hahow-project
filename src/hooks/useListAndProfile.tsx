import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { getHeroProfile, getHeroesList } from '../services/heroes';
import { Abilities, Hero } from '../services/types';

const mockData: Hero[] = [
  {
    id: '1',
    name: 'Daredevil',
    image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
  },
  {
    id: '2',
    name: 'Thor',
    image: 'https://cdn.marvel.com/content/1x/004tho_ons_mas_dsk_04.jpg',
  },
  {
    id: '3',
    name: 'Loki',
    image: 'https://m.media-amazon.com/images/I/81xETRmcFwL._AC_UF1000,1000_QL80_.jpg',
  },
];

const mockAbility: Abilities = {
  str: 2,
  int: 7,
  agi: 9,
  luk: 7,
};

function useList(id: string | undefined) {
  const [list, setList] = useState<Hero[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [initLoading, setInitLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [abilities, setAbilities] = useState<Abilities | null>(null);

  useEffect(() => {
    const con = new AbortController();
    setInitLoading(true);
    getHeroesList<Hero[]>(con)
      .then(({ data }) => {
        setError(null);
        setList(data);
      })
      .catch((e: AxiosError) => {
        if (e?.code !== 'ERR_CANCELED') {
          // setError('發生錯誤');
          setList(mockData);
        }
      })
      .finally(() => setInitLoading(false));

    return () => con.abort();
  }, []);

  useEffect(() => {
    const con = new AbortController();
    // listen routing id change, if changed, get latest hero profile
    if (id) {
      setIsLoading(true);
      getHeroProfile<Abilities>(id, con)
        .then(({ data }) => {
          setError(null);
          setAbilities(data);
        })
        .catch((e: AxiosError) => {
          if (e?.code !== 'ERR_CANCELED') {
            // setError('發生錯誤');
            setAbilities(mockAbility);
          }
        })
        .finally(() => setIsLoading(false));
    }

    return () => con.abort();
  }, [id]);

  return {
    error,
    list,
    abilities,
    initLoading,
    isLoading,
    setIsLoading,
  };
}

export default useList;

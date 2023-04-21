import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { getHeroProfile, getHeroesList } from '../services/heroes';
import { Abilities, Hero } from '../services/types';

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
          setError('發生錯誤');
          setList([]);
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
            setError('發生錯誤');
            setAbilities(null);
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

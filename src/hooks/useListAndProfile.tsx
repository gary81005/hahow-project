import { useEffect, useState } from 'react';

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
    setError(null);
    getHeroesList<Hero[]>(con)
      .then(({ data }) => setList(data))
      .catch(() => {
        setError('發生錯誤');
        setList([]);
      })
      .finally(() => setInitLoading(false));

    return () => con.abort();
  }, []);

  useEffect(() => {
    const con = new AbortController();
    // listen routing id change, if changed, get latest hero profile
    if (id) {
      setIsLoading(true);
      setError(null);
      getHeroProfile<Abilities>(id, con)
        .then(({ data }) => setAbilities(data))
        .catch(() => {
          setError('發生錯誤');
          setAbilities(null);
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

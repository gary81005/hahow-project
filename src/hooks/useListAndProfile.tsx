import { useEffect, useState } from 'react';

import { getHeroProfile, getHeroesList } from '../services/heroes';
import { Abilities, Hero } from '../services/types';

function useList(id: string | undefined) {
  const [list, setList] = useState<Hero[]>([]);
  const [initLoading, setInitLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [abilities, setAbilities] = useState<Abilities | null>(null);

  useEffect(() => {
    const con = new AbortController();
    setInitLoading(true);
    getHeroesList<Hero[]>(con)
      .then(({ data }) => setList(data))
      .catch(() => setList([]))
      .finally(() => setInitLoading(false));

    return () => con.abort();
  }, []);

  useEffect(() => {
    const con = new AbortController();
    // listen routing id change, if changed, get latest hero profile
    if (id) {
      setIsLoading(true);
      getHeroProfile<Abilities>(id, con)
        .then(({ data }) => setAbilities(data))
        .catch(() => setAbilities(null))
        .finally(() => setIsLoading(false));
    }

    return () => con.abort();
  }, [id]);

  return {
    list,
    abilities,
    initLoading,
    isLoading,
    setIsLoading,
  };
}

export default useList;

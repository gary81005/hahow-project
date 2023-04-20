import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';

import { Abilities, Hero } from '../services/types';
import { getHeroProfile, getHeroesList } from '../services/heroes';
import { AbilitiesSetting, HeroCardList } from '../components';
import { ListAndProfileProvider } from '../context';

const ListAndProfile = () => {
  const [list, setList] = useState<Hero[]>([]);
  const [abilities, setAbilities] = useState<Abilities | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const con = new AbortController();

    getHeroesList<Hero[]>(con)
      .then(({ data }) => setList(data))
      .catch(() => setList([]));

    return () => con.abort();
  }, []);

  useEffect(() => {
    const con = new AbortController();
    // listen routing id change, if changed, get latest hero profile
    if (id) {
      getHeroProfile<Abilities>(id, con)
        .then(({ data }) => {
          setAbilities(data);
        })
        .catch(() => {
          setAbilities(null);
        });
    }

    return () => con.abort();
  }, [id]);

  return (
    <ListAndProfileProvider>
      <Container disableGutters>
        <HeroCardList heroId={id || ''} list={list} />
        {id && abilities ? <AbilitiesSetting heroId={id} abilities={abilities} /> : null}
      </Container>
    </ListAndProfileProvider>
  );
};

export default ListAndProfile;

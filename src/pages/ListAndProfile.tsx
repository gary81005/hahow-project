import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Abilities, Hero } from '../services/types';
import { getHeroProfile, getHeroesList } from '../services/heroes';
import { AbilitiesSetting, HeroCardList } from '../components/Heroes';
import { ListAndProfileProvider } from '../context';

const ListAndProfile = () => {
  const [list, setList] = useState<Hero[]>([]);
  const [abilities, setAbilities] = useState<Abilities | null>(null);
  const { id } = useParams();

  useEffect(() => {
    getHeroesList<Hero[]>()
      .then(({ data }) => setList(data))
      .catch(() => setList([]));
  }, []);

  useEffect(() => {
    // listen routing id change, if changed, get latest hero profile
    if (id) {
      getHeroProfile<Abilities>(id)
        .then(({ data }) => {
          setAbilities(data);
        })
        .catch(() => {
          setAbilities(null);
        });
    }
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

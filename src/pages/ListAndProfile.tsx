import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Abilities, Hero } from '../services/types';
import { getHeroProfile, getHeroesList } from '../services/heroes';
import { AbilitiesSetting, HeroCardList } from '../components/heroes';
import { ListAndProfileProvider } from '../context';

const ListAndProfile = () => {
  const [list, setList] = useState<Hero[]>([]);
  const [abilities, setAbilities] = useState<Abilities | null>(null);
  const { id } = useParams();

  useEffect(() => {
    getHeroesList<Hero[]>().then(({ data }) => setList(data));
  }, []);

  useEffect(() => {
    if (id) {
      getHeroProfile<Abilities>(id).then(({ data }) => {
        setAbilities(data);
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

import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Abilities, Hero } from '../services/types';
import { getHeroProfile, getHeroesList } from '../services/heroes';
import { AbilitiesSetting, HeroCardList } from '../components/heroes';

const ListAndProfile = () => {
  const [list, setList] = useState<Hero[]>([]);
  const [abilities, setAbilities] = useState<Abilities | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleClick = (id: string) => {
    navigate(`/heroes/${id}`);
  };

  return (
    <Container disableGutters>
      <HeroCardList heroId={id || ''} list={list} />
      {id && abilities ? <AbilitiesSetting heroId={id} abilities={abilities} /> : null}
    </Container>
  );
};

export default ListAndProfile;

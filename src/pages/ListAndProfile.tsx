import { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Container, Theme, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { Abilities, Hero } from '../services/types';
import { getHeroProfile, getHeroesList } from '../services/heroes';
import { AbilitiesSetting } from '../components/heroes';

const StyledBox = styled(Box)`
  & {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

type CardProps = {
  isSelected: boolean;
};

const StyledCard = styled(Card)<CardProps>(({ theme, isSelected }) => ({
  margin: theme.spacing(2),
  cursor: 'pointer',
  backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.background.default,
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: theme.spacing(25),
  width: theme.spacing(35),
}));

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
      <StyledBox>
        {list.map((opt) => (
          <StyledCard key={opt.id} isSelected={opt.id === id} onClick={() => handleClick(opt.id)}>
            <StyledCardMedia image={opt.image} title={opt.name} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {opt.name}
              </Typography>
            </CardContent>
          </StyledCard>
        ))}
      </StyledBox>
      {id && abilities ? <AbilitiesSetting heroId={id} abilities={abilities} /> : null}
    </Container>
  );
};

export default ListAndProfile;

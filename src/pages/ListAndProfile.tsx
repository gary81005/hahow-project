import { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { Hero } from '../services/types';
import { getHeroesList } from '../services/heroes';

const StyledBox = styled(Box)`
  & {
    width: 100%;
    display: flex;
    aligin-items: center;
    justify-content: center;
  }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  maxwidth: 345,
  margin: theme.spacing(2),
  cursor: 'pointer',
}));

const StyledCardMedia = styled(CardMedia)(() => ({
  height: 140,
  width: 160,
}));

const ListAndProfile = () => {
  const [list, setList] = useState<Hero[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getHeroesList<Hero[]>().then(({ data }) => setList(data));
  }, []);

  useEffect(() => {
    console.log(id);
  }, [id]);

  const handleClick = (id: string) => {
    navigate(`/heroes/${id}`);
  };

  return (
    <Container>
      <StyledBox>
        {list.map((opt) => (
          <StyledCard key={opt.id} onClick={() => handleClick(opt.id)}>
            <StyledCardMedia image={opt.image} title={opt.name} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {opt.name}
              </Typography>
            </CardContent>
          </StyledCard>
        ))}
      </StyledBox>
      {id && <div>{id}</div>}
    </Container>
  );
};

export default ListAndProfile;

import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../../services/types';

type CardProps = {
  isSelected: boolean;
};

const StyledCard = styled(Card)<CardProps>(({ theme, isSelected }) => ({
  margin: theme.spacing(2),
  cursor: 'pointer',
  backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.background.default,
  border: '1px solid',
  ':hover': { boxShadow: '0 0 20px 10px lightgrey' },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  objectFit: 'contain',
  height: theme.spacing(25),
}));

const HeroCardList = ({ heroId, list }: { heroId: string; list: Hero[] }) => {
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/heroes/${id}`);
  };

  return (
    <Grid container alignItems="center" columns={{ xs: 4, sm: 8, md: 12 }}>
      {list.map((opt) => (
        <Grid key={opt.id} xs={12 / list.length} sm={12 / list.length} md={12 / list.length}>
          <StyledCard
            isSelected={opt.id === heroId}
            onClick={() => handleClick(opt.id)}
            elevation={0}
          >
            <StyledCardMedia image={opt.image} title={opt.name} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {opt.name}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default HeroCardList;

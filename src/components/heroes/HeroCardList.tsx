import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../../services/types';

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

const HeroCardList = ({ heroId, list }: { heroId: string; list: Hero[] }) => {
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/heroes/${id}`);
  };

  return (
    <StyledBox>
      {list.map((opt) => (
        <StyledCard key={opt.id} isSelected={opt.id === heroId} onClick={() => handleClick(opt.id)}>
          <StyledCardMedia image={opt.image} title={opt.name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {opt.name}
            </Typography>
          </CardContent>
        </StyledCard>
      ))}
    </StyledBox>
  );
};

export default HeroCardList;

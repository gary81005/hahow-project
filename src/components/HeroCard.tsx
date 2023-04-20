import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Hero } from '../services/types';
import { useListAndProfileContext } from '../context';
import { CardProps } from './types';

const CardContainer = styled(Card)<CardProps>(({ theme, disabled, selected }) => ({
  margin: theme.spacing(2),
  cursor: 'pointer',
  backgroundColor: selected ? theme.palette.primary.main : theme.palette.background.default,
  border: '1px solid',
  pointerEvents: disabled ? 'none' : 'auto',
  ':hover': { boxShadow: '0 0 20px 10px lightgrey' },
}));

const CardImage = styled(CardMedia)(({ theme }) => ({
  objectFit: 'contain',
  height: theme.spacing(25),
}));

const HeroCard = ({
  hero,
  isSelected,
  onClick,
}: {
  hero: Hero;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const { isLoading } = useListAndProfileContext();

  return (
    <CardContainer
      disabled={isLoading || false}
      selected={isSelected}
      onClick={onClick}
      elevation={0}
    >
      <CardImage image={hero.image} title={hero.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {hero.name}
        </Typography>
      </CardContent>
    </CardContainer>
  );
};

export default HeroCard;

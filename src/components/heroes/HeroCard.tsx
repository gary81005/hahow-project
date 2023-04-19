import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { Hero } from '../../services/types';
import { useListAndProfileContext } from '../../context';

type CardProps = {
  isSelected: boolean;
  disabled: boolean;
};

const StyledCard = styled(Card)<CardProps>(({ theme, disabled, isSelected }) => ({
  margin: theme.spacing(2),
  cursor: 'pointer',
  backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.background.default,
  border: '1px solid',
  pointerEvents: disabled ? 'none' : 'auto',
  ':hover': { boxShadow: '0 0 20px 10px lightgrey' },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
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
    <StyledCard
      disabled={isLoading || false}
      isSelected={isSelected}
      onClick={onClick}
      elevation={0}
    >
      <StyledCardMedia image={hero.image} title={hero.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {hero.name}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default HeroCard;

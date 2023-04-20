import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeroCard from './HeroCard';
import { HeroCardListProps } from './types';

const HeroCardList = ({ heroId, list }: HeroCardListProps) => {
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/heroes/${id}`);
  };

  return (
    <Grid container alignItems="center" columns={{ xs: 4, sm: 8, md: 12 }}>
      {list.map((opt) => (
        <Grid item key={opt.id} xs={12 / list.length}>
          <HeroCard hero={opt} isSelected={opt.id === heroId} onClick={() => handleClick(opt.id)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default HeroCardList;

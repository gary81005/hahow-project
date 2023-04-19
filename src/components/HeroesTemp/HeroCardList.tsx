import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../../services/types';
import HeroCard from './HeroCard';

const HeroCardList = ({ heroId, list }: { heroId: string; list: Hero[] }) => {
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

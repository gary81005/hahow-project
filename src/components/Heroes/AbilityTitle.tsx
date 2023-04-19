import { Typography } from '@mui/material';

const AbilityTitle = ({ title }: { title: string }) => {
  return (
    <Typography gutterBottom variant="h5" component="div">
      {title}
    </Typography>
  );
};

export default AbilityTitle;

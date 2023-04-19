import { Typography } from '@mui/material';

const AbilityValue = ({ value }: { value: number }) => {
  return (
    <Typography variant="body1" component="div">
      {value}
    </Typography>
  );
};

export default AbilityValue;

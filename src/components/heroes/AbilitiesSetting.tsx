import { useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Abilities } from '../../services/types';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(2),
  '& > .MuiBox-root': {
    display: 'flex',
  },
}));

const AbilitiesSetting = ({ abilities }: { abilities: Abilities }) => {
  const [titles, setTitles] = useState<string[]>([]);
  const [values, setValues] = useState<Abilities | null>(null);
  useEffect(() => {
    const abilitiesTitle = Object.keys(abilities);
    setTitles(abilitiesTitle);
    setValues(abilities);
  }, [abilities]);

  return (
    <StyledBox>
      {titles.map((opt) => (
        <Box sx={{}}>
          <Typography key={opt} gutterBottom variant="h5" component="div">
            {opt}
          </Typography>
          <IconButton>
            <AddOutlined />
          </IconButton>
          {values ? (
            <Typography variant="body1" component="div">
              {values[opt]}
            </Typography>
          ) : (
            0
          )}
          <IconButton>
            <RemoveOutlined />
          </IconButton>
        </Box>
      ))}
    </StyledBox>
  );
};

export default AbilitiesSetting;

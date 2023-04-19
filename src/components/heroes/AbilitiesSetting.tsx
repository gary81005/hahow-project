import { useEffect, useState } from 'react';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Abilities } from '../../services/types';
import { updateHeroProfile } from '../../services/heroes';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  '& > .MuiBox-root:first-child': {
    display: 'flex',
    flexDirection: 'column',
    '.MuiTypography-root': {
      minWidth: theme.spacing(10),
      width: '30%',
    },
    '*': {
      margin: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  '& > .MuiBox-root:last-child': {
    width: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    '.MuiTypography-root': {
      display: 'flex',
      alignItems: 'start',
      marginBottom: theme.spacing(2),
    },
  },
}));

const AbilitiesSetting = ({ heroId, abilities }: { heroId: string; abilities: Abilities }) => {
  const [titles, setTitles] = useState<string[]>([]);
  const [values, setValues] = useState<Abilities | null>(null);
  const [remain, setRemain] = useState(0);

  const handleAdd = (type: string) => {
    setRemain(remain - 1);
    setValues((prev) => ({
      ...prev,
      [type]: values ? values?.[type] + 1 : 0,
    }));
  };

  const handleMinus = (type: string) => {
    setRemain(remain + 1);
    setValues((prev) => ({
      ...prev,
      [type]: values ? values?.[type] - 1 : 0,
    }));
  };

  const handleSave = () => {
    if (values) {
      updateHeroProfile({ heroId, abilities: values });
    }
  };

  useEffect(() => {
    const abilitiesTitle = Object.keys(abilities);
    setTitles(abilitiesTitle);
    setValues(abilities);
    setRemain(0);
  }, [abilities]);

  return (
    <StyledBox>
      <Box>
        {titles.map((opt) => (
          <Box>
            <Typography key={opt} gutterBottom variant="h5" component="div">
              {opt.toUpperCase()}
            </Typography>
            <IconButton size="small" disabled={remain === 0} onClick={() => handleAdd(opt)}>
              <AddOutlined />
            </IconButton>
            {values ? (
              <Typography variant="body1" component="div">
                {values[opt]}
              </Typography>
            ) : (
              0
            )}
            <IconButton
              size="small"
              disabled={!values || values[opt] === 0}
              onClick={() => handleMinus(opt)}
            >
              <RemoveOutlined />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Box>
        <Typography>剩餘點數:{remain}</Typography>
        <Button variant="contained" color="primary" onClick={handleSave}>
          儲存
        </Button>
      </Box>
    </StyledBox>
  );
};

export default AbilitiesSetting;

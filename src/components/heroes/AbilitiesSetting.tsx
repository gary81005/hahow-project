import { useEffect, useState } from 'react';
import { Alert, Box, Button, IconButton, Snackbar, Typography } from '@mui/material';
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
  const [alertOpen, setAlertOpen] = useState(false);
  const [status, setStatus] = useState<'warning' | 'success' | 'error'>('warning');
  const [info, setInfo] = useState<string | null>(null);
  const [hasChange, setHasChage] = useState(false);

  const handleAdd = (type: string) => {
    setRemain(remain - 1);
    setHasChage(true);
    setValues((prev) => ({
      ...prev,
      [type]: values ? values?.[type] + 1 : 0,
    }));
  };

  const handleMinus = (type: string) => {
    setRemain(remain + 1);
    setHasChage(true);
    setValues((prev) => ({
      ...prev,
      [type]: values ? values?.[type] - 1 : 0,
    }));
  };

  const handleSave = () => {
    if (!hasChange) {
      setInfo('請先調整能力值');
      setStatus('warning');
      setAlertOpen(true);
      return;
    }
    if (values) {
      updateHeroProfile({ heroId, abilities: values })
        .then(() => {
          setStatus('success');
          setInfo('更新成功');
        })
        .catch(() => {
          setStatus('error');
          setInfo('更新失敗');
        })
        .finally(() => {
          setAlertOpen(true);
          setHasChage(false);
        });
    }
  };

  const handleClose = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    const abilitiesTitle = Object.keys(abilities);
    setTitles(abilitiesTitle);
    setHasChage(false);
    setAlertOpen(false);
    setStatus('warning');
    setValues(abilities);
    setRemain(0);
  }, [abilities]);

  return (
    <>
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
          {info}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AbilitiesSetting;

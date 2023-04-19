import { useEffect, useState } from 'react';
import { Alert, Box, IconButton, Snackbar, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Abilities } from '../../services/types';
import { updateHeroProfile } from '../../services/heroes';
import { useListAndProfileContext } from '../../context';

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

interface UserNoti {
  alertOpen: boolean;
  status: 'warning' | 'success' | 'error';
  info: string | null;
}

interface AbilitiesSettins {
  titles: string[];
  values: Abilities | null;
  remain: number;
}

const AbilitiesSetting = ({ heroId, abilities }: { heroId: string; abilities: Abilities }) => {
  const { isLoading, updateStatus } = useListAndProfileContext();
  const [abilitiesSettins, setAbilitiesSetting] = useState<AbilitiesSettins>({
    titles: [],
    values: null,
    remain: 0,
  });
  const [userNoti, setUserNoti] = useState<UserNoti>({
    alertOpen: false,
    status: 'warning',
    info: null,
  });

  const { titles, values, remain } = abilitiesSettins;
  const { alertOpen, status, info } = userNoti;

  const handleAdd = (type: string) => {
    setAbilitiesSetting((prev) => ({
      ...prev,
      remain: remain - 1,
      values: {
        ...prev.values,
        [type]: values ? values?.[type] + 1 : 0,
      },
    }));
  };

  const handleMinus = (type: string) => {
    setAbilitiesSetting((prev) => ({
      ...prev,
      remain: remain + 1,
      values: {
        ...prev.values,
        [type]: values ? values?.[type] - 1 : 0,
      },
    }));
  };

  const checkValidate = () => {
    if (JSON.stringify(abilities) === JSON.stringify(values)) {
      setUserNoti({
        alertOpen: true,
        status: 'warning',
        info: '請先調整能力值',
      });
      return false;
    }
    if (remain !== 0) {
      setUserNoti({
        alertOpen: true,
        status: 'warning',
        info: '請使用完剩餘點數',
      });
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (values && checkValidate()) {
      updateStatus && updateStatus(true);
      updateHeroProfile({ heroId, abilities: values })
        .then(() => {
          setUserNoti({
            alertOpen: true,
            status: 'success',
            info: '更新成功',
          });
        })
        .catch(() => {
          setUserNoti({
            alertOpen: true,
            status: 'error',
            info: '更新失敗',
          });
        })
        .finally(() => {
          updateStatus && updateStatus(false);
        });
    }
  };

  const handleClose = () => {
    setUserNoti((prev) => ({
      ...prev,
      alertOpen: false,
    }));
  };

  useEffect(() => {
    const abilitiesTitle = Object.keys(abilities);
    setAbilitiesSetting({
      titles: abilitiesTitle,
      values: abilities,
      remain: 0,
    });
    setUserNoti({
      alertOpen: false,
      status: 'warning',
      info: 'null',
    });
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
          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            儲存
          </LoadingButton>
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

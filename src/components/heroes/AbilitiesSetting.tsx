import { useEffect, useState } from 'react';
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { Abilities } from '../../services/types';
import { updateHeroProfile } from '../../services/heroes';
import { useListAndProfileContext } from '../../context';
import { AbilityTitle, AddButton, MinusButton, AbilityValue, SaveButton } from '../Heroes';

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
  hasChanged: boolean;
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
    hasChanged: false,
  });

  const { titles, values, remain } = abilitiesSettins;
  const { alertOpen, status, info, hasChanged } = userNoti;

  const handleAdd = (type: string) => {
    setAbilitiesSetting((prev) => ({
      ...prev,
      remain: remain - 1,
      values: {
        ...prev.values,
        [type]: values ? values?.[type] + 1 : 0,
      },
    }));
    setUserNoti((prev) => ({
      ...prev,
      hasChanged: true,
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
    setUserNoti((prev) => ({
      ...prev,
      hasChanged: true,
    }));
  };

  const checkValidate = () => {
    // check abilities is changed or not
    if (!hasChanged) {
      setUserNoti((prev) => ({
        ...prev,
        alertOpen: true,
        status: 'warning',
        info: '請先調整能力值',
      }));
      return false;
    }
    // check remain points is 0 or not
    if (remain !== 0) {
      setUserNoti((prev) => ({
        ...prev,
        alertOpen: true,
        status: 'warning',
        info: '請使用完剩餘點數',
      }));
      return false;
    }

    return true;
  };

  // save button click handle, it will check validation first. It will call update api if pass
  const handleSave = () => {
    if (values && checkValidate()) {
      updateStatus && updateStatus(true);
      updateHeroProfile({ heroId, abilities: values })
        .then(() => {
          setUserNoti({
            alertOpen: true,
            status: 'success',
            info: '更新成功',
            hasChanged: false,
          });
        })
        .catch(() => {
          setUserNoti((prev) => ({
            ...prev,
            alertOpen: true,
            status: 'error',
            info: '更新失敗',
          }));
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
      hasChanged: false,
    });
  }, [abilities]);

  return (
    <>
      <StyledBox>
        <Box>
          {titles.map((opt) => (
            <Box key={opt}>
              <AbilityTitle title={opt.toUpperCase()} />
              <AddButton size="small" disabled={remain === 0} onClick={() => handleAdd(opt)} />
              {values ? <AbilityValue value={values[opt]} /> : 0}
              <MinusButton
                size="small"
                disabled={!values || values[opt] === 0}
                onClick={() => handleMinus(opt)}
              />
            </Box>
          ))}
        </Box>
        <Box>
          <Typography>剩餘點數:{remain}</Typography>
          <SaveButton
            loading={isLoading}
            variant="contained"
            color="primary"
            onClick={handleSave}
          />
        </Box>
      </StyledBox>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={status}>
          {info}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AbilitiesSetting;

import { useEffect, useState } from 'react';
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { updateHeroProfile } from '../services/heroes';
import { useListAndProfileContext } from '../context';
import AbilityTitle from './AbilityTitle';
import AddButton from './AddButton';
import AbilityValue from './AbilityValue';
import MinusButton from './MinusButton';
import SaveButton from './SaveButton';
import { AbilitiesSettingProps, AbilitiesSettings, UserNoti } from './types';

const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  '& > .MuiBox-root:first-of-type': {
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
  '& > .MuiBox-root:last-of-type': {
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

const AbilitiesSetting = ({ heroId, abilities }: AbilitiesSettingProps) => {
  const { isLoading, updateStatus } = useListAndProfileContext();
  const [abilitiesSettings, setAbilitiesSettings] = useState<AbilitiesSettings>({
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

  const { titles, values, remain } = abilitiesSettings;
  const { alertOpen, status, info, hasChanged } = userNoti;

  const handleAdd = (type: string) => {
    setAbilitiesSettings((prev) => ({
      ...prev,
      remain: remain - 1,
      values: {
        ...prev.values,
        [type]: values && values?.[type] !== undefined ? values[type] + 1 : 0,
      },
    }));
    setUserNoti((prev) => ({
      ...prev,
      hasChanged: true,
    }));
  };

  const handleMinus = (type: string) => {
    setAbilitiesSettings((prev) => ({
      ...prev,
      remain: remain + 1,
      values: {
        ...prev.values,
        [type]: values && values?.[type] !== undefined ? values[type] - 1 : 0,
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
      if (updateStatus) {
        updateStatus(true);
      }
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
          if (updateStatus) {
            updateStatus(false);
          }
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
    setAbilitiesSettings({
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
      <MainContainer>
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
      </MainContainer>
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

import { Alert, Box, Snackbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useListAndProfileContext } from '../context';
import AbilityTitle from './AbilityTitle';
import AddButton from './AddButton';
import AbilityValue from './AbilityValue';
import MinusButton from './MinusButton';
import SaveButton from './SaveButton';
import { AbilitiesSettingProps } from './types';
import useAbilitiesSetting from '../hooks/useAbilitiesSetting';

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
  const { isLoading } = useListAndProfileContext();
  const { abilitiesSettings, userNoti, handleAdd, handleClose, handleMinus, handleSave } =
    useAbilitiesSetting(heroId, abilities);

  const { titles, values, remain } = abilitiesSettings;
  const { alertOpen, status, info } = userNoti;

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

import { Alert, Snackbar } from '@mui/material';
import { AlertInfoProps } from './types/AlertInfo';

const AlertInfo = ({ alertOpen, status, info, onClose }: AlertInfoProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={alertOpen}
      autoHideDuration={5000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={status}>
        {info}
      </Alert>
    </Snackbar>
  );
};

export default AlertInfo;

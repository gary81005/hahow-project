import { RemoveOutlined } from '@mui/icons-material';
import { IconButton, IconButtonProps, Typography } from '@mui/material';

const MinusButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props}>
      <RemoveOutlined />
    </IconButton>
  );
};

export default MinusButton;

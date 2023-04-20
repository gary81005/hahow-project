import { RemoveOutlined } from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';

const MinusButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props}>
      <RemoveOutlined />
    </IconButton>
  );
};

export default MinusButton;

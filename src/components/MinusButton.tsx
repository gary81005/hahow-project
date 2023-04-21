import { RemoveOutlined } from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';

const MinusButton = (props: IconButtonProps) => {
  return (
    <IconButton color="primary" {...props}>
      <RemoveOutlined />
    </IconButton>
  );
};

export default MinusButton;

import { AddOutlined } from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';

const AddButton = (props: IconButtonProps) => {
  return (
    <IconButton color="primary" {...props}>
      <AddOutlined />
    </IconButton>
  );
};

export default AddButton;

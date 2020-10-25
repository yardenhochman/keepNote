import { default as IconButtonMUI } from '@material-ui/core/IconButton';

const IconButton = ({ icon, actionText }) => (
  <IconButtonMUI aria-label={actionText}>
    {icon}
  </IconButtonMUI>
)

export default IconButton;
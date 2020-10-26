import { default as IconButtonMUI } from '@material-ui/core/IconButton';

const IconButton = ({ icon, actionText, ...props }) => (
  <IconButtonMUI aria-label={actionText} {...props}>
    {icon}
  </IconButtonMUI>
)

export default IconButton;
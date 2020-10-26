/* eslint-disable react/no-multi-comp */
import Truncate from 'react-truncate';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const ConditionalTooltip = ({ disable, children, ...props }) =>
  disable ? children : <Tooltip {...props}>{children}</Tooltip>;

const TruncateTooltip = ({ children, title, lines, className }) => {
  const [isTruncated, setTruncate] = React.useState(false);
  return (
    <ConditionalTooltip
      title={<span className={className}>{title}</span>}
      disable={!isTruncated}>
      <Truncate lines={lines} onTruncate={isTruncated => setTruncate(isTruncated)}>
        {children}
      </Truncate>
    </ConditionalTooltip>
  );
};

export default TruncateTooltip
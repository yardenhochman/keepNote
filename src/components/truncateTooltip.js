/* eslint-disable react/no-multi-comp */
import Truncate from 'react-truncate';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';

const ConditionalTooltip = ({ disable, children, ...props }) =>
  disable ? children : <Tooltip {...props}>{children}</Tooltip>;

const TruncateTooltip = ({ children, title, lines, className }) => {
  const [isTruncated, setTruncate] = React.useState(false);
  return (
    <ConditionalTooltip
      title={<TooltipText className={className}>{title}</TooltipText>}
      disable={!isTruncated}>
      <Truncate lines={lines} onTruncate={isTruncated => setTruncate(isTruncated)}>
        {children}
      </Truncate>
    </ConditionalTooltip>
  );
};

export default TruncateTooltip

const TooltipText = styled.span`
  font-size: 18px;
  line-height: 20px;
`;

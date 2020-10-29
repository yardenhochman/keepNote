import React from 'react'
import styled, { css } from 'styled-components'
import Switch from '@material-ui/core/Switch';

const LabeledSwitch = ({ optionA, optionB, checked, ...props }) => {
  return (
  <SwitchArea>
    <Label isActive={!checked}>{optionA}</Label>
      <Switch {...{ checked, ...props }} />
    <Label isActive={checked}>{optionB}</Label>
  </SwitchArea>
)
}
export default LabeledSwitch

const SwitchArea = styled.div`
  display: flex;
  .MuiSwitch-track {
    background-color: #3f51b5;
  }

`

const Label = styled.label`
  ${({ isActive }) => isActive && css`
    font-weight: bold;
  `}
`
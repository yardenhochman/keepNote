import React from 'react'
import styled from 'styled-components'
import ModalMUI from '@material-ui/core/Modal';
import {useRecoilState} from 'recoil';
import { openModal } from '../state'

const Modal = ({ children, onClose }) => {
  const [open, setModalOpen] = useRecoilState(openModal);

  return (
    <ModalMUI open={open} onClose={()=>setModalOpen(false)}>
    <ModalWrapper>
    {children}
    </ModalWrapper>
  </ModalMUI>

  )
}

export default Modal

const ModalWrapper = styled.div`
  position: absolute;
  margin: 0 auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  border: 2px solid #000;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12);
  padding: 16px 32px 24px;
`
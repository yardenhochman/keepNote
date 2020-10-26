import React from 'react'
import styled from 'styled-components';
import { Form, InputText } from './formElements';
import Button from '@material-ui/core/Button';
import { useRecoilState, useRecoilValue } from 'recoil'
import { noteListState, userName } from '../state'
import { v4 as uuidv4 } from 'uuid';

const NewNote = ({ onClose }) => {
  const [noteList, setNoteList] = useRecoilState(noteListState);

  const addNote = (note) => {
    const newNoteList = [...noteList]
    newNoteList.push(note)
    setNoteList(newNoteList)
  }
  const currentUserName = useRecoilValue(userName)

  const onSubmit = ({ content }) => {
    addNote({ content, author: currentUserName, date: new Date(), id: uuidv4() });
    onClose();
  }
  return (
      <CardForm onSubmit={onSubmit}>
        <InputText name='content' required/>
        <SaveButton>Save</SaveButton>
      </CardForm>
  )
}

export default NewNote;



const CardForm = styled(Form)`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`

const SaveButton = styled(Button).attrs({
  variant: 'outlined',
  type: 'submit'
})`
  margin-top: 10px;
`
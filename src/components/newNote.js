import React from 'react'
import styled from 'styled-components';
import { Form, InputText, Error } from './formElements';
import Button from '@material-ui/core/Button';
import { useRecoilState, useRecoilValue } from 'recoil'
import { noteListState, userName, openModal, selectedNote, getNoteListById } from '../state'
import { v4 as uuidv4 } from 'uuid';

const NewNote = () => {
  const [noteList, setNoteList] = useRecoilState(noteListState);
  const [noteId, setSelectedNote] = useRecoilState(selectedNote);
  const setModalOpen = useRecoilState(openModal)[1];
  
  const noteListById = useRecoilValue(getNoteListById)
  const currentNote = noteListById?.[noteId]

  const addNote = (note) => {
    const newNoteList = [...noteList]
    newNoteList.push(note)
    setNoteList(newNoteList)
  }
  const currentUserName = useRecoilValue(userName)

  const onSubmit = ({ content }) => {
    if (!noteId) {
      addNote({ content, author: currentUserName, date: new Date(), id: uuidv4() });
    } else {
      const newNoteList = [...noteList]
      newNoteList[currentNote.index] = { ...currentNote, content}
      setNoteList(newNoteList)
    }
    setModalOpen(false);
  }

  React.useEffect(()=>{
    return ()=>{
      setSelectedNote(false)
    }
  },[setSelectedNote])

  return (
      <CardForm onSubmit={onSubmit} defaultValues={currentNote}>
        <InputText name='content' required />
        <SaveButton>Save</SaveButton>
        <Error type='required' message='cannot save empty note' />
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
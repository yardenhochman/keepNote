import React from 'react'
import styled from 'styled-components';
import { Form, InputText, Error } from './formElements';
import Button from '@material-ui/core/Button';
import { useRecoilState, useRecoilValue } from 'recoil'
import { noteListState, userName, openModal, selectedNote, getNoteListById } from '../state'
import { v4 as uuidv4 } from 'uuid';

const NewNote = () => {

  const inputRef = React.useRef()

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
    inputRef.current?.focus()
    return ()=>{
      setSelectedNote(false)
    }
  },[setSelectedNote])

  return (
      <CardForm onSubmit={onSubmit} defaultValues={currentNote}>
        <InputText label='What would you like to say?' name='content' required autocomplete="off" innerRef={inputRef}/>
        <InputText label='Author Name' name='author' required autocomplete="off" />
        <div>
          <CancelButton onClick={()=>setModalOpen(false)}>Cancel</CancelButton>
          <SaveButton>Save</SaveButton>
        </div>
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

  & > div {
    display: flex;
    justify-content: flex-end;
  }
`
const CancelButton = styled(Button).attrs({
  variant: 'outlined',
})`
  margin-top: 10px;
  margin-right: 5px;
`

const SaveButton = styled(CancelButton).attrs({
  type: 'submit'
})``

import React from 'react'
import {useRecoilState, useRecoilValue} from 'recoil';
import { noteListState, PersistenceObserver, openModal } from '../state'
import NotesList from '../components/notesList'
import Button from '@material-ui/core/Button';
import NewNote from '../components/newNote';
import Modal from '../components/Modal'
import styled from 'styled-components'

const useFillNotesFromStorage = () => {
  const setNoteList = useRecoilState(noteListState)[1];

  React.useEffect(()=>{
    const unparsedItem = localStorage.getItem('noteListState');
    if (unparsedItem) {
      setNoteList(JSON.parse(unparsedItem))
    }
  },[setNoteList])
}
  

  const MainPage = () => {
    const noteList = useRecoilValue(noteListState);
    const setModalOpen = useRecoilState(openModal)[1];

    PersistenceObserver()
    useFillNotesFromStorage()

  return (
    <Page>
      <Button variant="outlined" onClick={()=>setModalOpen(true)}>New Note</Button>
      <NotesList noteList={noteList} />
      <Modal>
        <NewNote />
      </Modal>
    </Page>
  )

}

export default MainPage;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > button {
    width: 300px;
  }
  margin-top: 5px;
`


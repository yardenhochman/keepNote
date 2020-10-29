import React from 'react'
import { useRecoilValue } from 'recoil';
import { useFillNotesFromStorage } from '../utils/hooks'
import { noteListState, PersistenceObserver } from '../state'
import NotesList from '../components/notesList'
import NewNote from '../components/newNote';
import Modal from '../components/Modal'
import styled from 'styled-components'


  const MainPage = () => {
    const noteList = useRecoilValue(noteListState);

    PersistenceObserver()
    useFillNotesFromStorage()

  return (
    <Page>
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


import React from 'react'
import { useRecoilValue } from 'recoil';
import { useFillNotesFromStorage } from '../utils/hooks'
import { noteListState, userState, PersistenceObserver } from '../state'
import NotesList from '../components/notesList'
import NewNote from '../components/newNote';
import Modal from '../components/Modal'
import styled from 'styled-components'
import Auth from './Auth'
import { Page } from './styles'

  const MainPage = () => {
    const noteList = useRecoilValue(noteListState);
    const user = useRecoilValue(userState)
    PersistenceObserver()
    useFillNotesFromStorage()

    if (!user?.name) return <Auth />


  return (
    <NotesPage>
      <NotesList noteList={noteList} />
      <Modal>
        <NewNote />
      </Modal>
    </NotesPage>
  )

}

export default MainPage;

const NotesPage = styled(Page)`
  & > button {
    width: 300px;
  }
`


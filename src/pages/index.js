import React from 'react'
import { useRecoilValue, useRecoilState } from 'recoil';
import { noteListState, userState, usePersistenceObserver, useFillNotesFromStorage } from '../state'
import NotesList from '../components/notesList'
import NewNote from '../components/newNote';
import Modal from '../components/Modal'
import styled from 'styled-components'
import Auth from './Auth'
import { Page } from './styles'
import Button from '@material-ui/core/Button';

  const MainPage = () => {
    const noteList = useRecoilValue(noteListState);
    const [user, setUser] = useRecoilState(userState)

    usePersistenceObserver()
    useFillNotesFromStorage()

    if (!user?.name) return <Auth />


  return (
    <NotesPage>
      <Button onClick={()=> setUser(null)}>logout</Button>
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
    align-self: flex-end;
  }
`


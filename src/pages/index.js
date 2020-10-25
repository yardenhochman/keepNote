import React from 'react'
import styled from 'styled-components'
import {
  useRecoilState,
} from 'recoil';
import { noteListState } from '../state'
import NotesList from '../components/notesList'

const MainPage = () => {
  const [noteList, setListState] = useRecoilState(noteListState);

  
  return (
    <Page>
        <NotesList noteList={noteList} />
    </Page>
  )

}

export default MainPage;

const Page = styled.div`
  display: flex;
  flex-direction: column;
`
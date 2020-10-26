import React from 'react'
import styled from 'styled-components'
import {
  useRecoilState,
} from 'recoil';
import { noteListState, PersistenceObserver } from '../state'
import NotesList from '../components/notesList'
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import NewNote from '../components/newNote';

// const initializeState = ({set}) => {
  //   const [key, value] = localStorage.getItem('noteListState')
  //   set(noteListState, JSON.parse(value).value);
  // }
  
  const MainPage = () => {
    const [noteList, setNoteList] = useRecoilState(noteListState);
    const [open, triggerModalOpen] = React.useState(false)
    PersistenceObserver()

    React.useEffect(()=>{
      const unparsedItem = localStorage.getItem('noteListState');
      if (unparsedItem) {
        setNoteList(JSON.parse(unparsedItem))
      }
    },[setNoteList])
  
  return (
    <Page>
      <Button variant="outlined" onClick={()=>triggerModalOpen(isOpen=>!isOpen)}>new note</Button>
      <NotesList noteList={noteList} />
      <Modal
        open={open}
        onClose={()=>triggerModalOpen(false)}
      >
        <ModalWrapper>
          <NewNote onClose={()=>triggerModalOpen(false)}/>
        </ModalWrapper>
      </Modal>
    </Page>
  )

}

export default MainPage;

const Page = styled.div`
  display: flex;
  flex-direction: column;
`

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
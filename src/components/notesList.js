import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from './iconButton';
import styled from 'styled-components';
import { dateDisplay } from '../utils/dateUtils';
import {useRecoilState, useRecoilValue} from 'recoil';
import { selectedNote, openModal, getNoteListById, noteListState, getSortedNoteList } from '../state'
import TruncateTooltip from './truncateTooltip'
import Button from '@material-ui/core/Button';

const NotesList = () => {
  const setSelectedNote = useRecoilState(selectedNote)[1];
  const setNoteList = useRecoilState(noteListState)[1];
  const setModalOpen = useRecoilState(openModal)[1];
  const noteListById = useRecoilValue(getNoteListById)
  const noteList = useRecoilValue(getSortedNoteList)

  const onNoteClick = note => e => {
    e.preventDefault()
    setSelectedNote(note.id)
    setModalOpen(true)
  }
  
  const deleteNote = note => e => {
    e.preventDefault()
    e.stopPropagation()
    const noteIndex = noteListById[note.id]?.index ?? false
    if (noteIndex !== false) {
      const newNoteList = 
      [...noteList].splice(noteIndex,1)
      setNoteList(newNoteList)
    }
  }

  return (
    <ListOfNotes>
          <NewNoteButon onClick={()=>setModalOpen(true)}>New Note</NewNoteButon>
      {noteList.map(note=>(
        <NoteCard key={note.content+note.date} variant="outlined" onClick={onNoteClick(note)}>
          <ActionArea>
            <IconButton icon={<DeleteIcon />} actionText='delete' onClick={deleteNote(note)}/>
          </ActionArea>
          <Content>
            <TruncateTooltip lines={2} title={note.content}>
              <NoteText >{note.content}</NoteText>
            </TruncateTooltip>

          </Content>
        <InfoArea>
          <Author>{note.author}</Author>
          <DateText>{dateDisplay(note.date)}</DateText>
        </InfoArea>
        </NoteCard>
      ))}
    </ListOfNotes>
  )
  
}

export default NotesList

const ListOfNotes = styled.ul`
  display: flex;
  flex-direction: row;
  width: 100vw;
  padding: 0 10px;
  max-height: calc(100vh - 75px);
  flex-wrap: wrap;
  @media (max-width: 1023px) {
    overflow: scroll;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
`
const NoteCard = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
  width: 300px;
  cursor: pointer;
  margin: 25px 15px 0;
`
const InfoArea = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
  span {
    color: rgba(0, 0, 0, 0.54);
    display: block;
    font-size: 1rem;
  }
`
const DateText = styled.span`
  align-self: flex-end;
`

const Content = styled.div`
  padding: 0 16px;
`

const ActionArea = styled.div`
  display: flex;
  justify-content: flex-end;
`
const NoteText = styled.p`
  margin-bottom: 24px;
  text-align: center;
`

const Author = styled.span`
  text-transform: capitalize;
`

const NewNoteButon = styled(Button).attrs(({
  variant: 'outlined'
}))`
  width: 300px;
  margin: 25px 15px 0;

`
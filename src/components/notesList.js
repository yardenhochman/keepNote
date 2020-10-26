import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from './iconButton';
import styled from 'styled-components';
import { dateDisplay } from '../utils/dateUtils';
import {useRecoilState} from 'recoil';
import { selectedNote, openModal } from '../state'

const NotesList = ({ noteList }) => {
  const setSelectedNote = useRecoilState(selectedNote)[1];
  const setModalOpen = useRecoilState(openModal)[1];

  const onNoteClick = note => e => {
    e.preventDefault()
    setSelectedNote(note.id)
    setModalOpen(true)
  }

  return (
    <ListOfNotes>
      {noteList.map(note=>(
        <NoteCard key={note.content+note.date} variant="outlined" onClick={onNoteClick(note)}>
          <ActionArea>
            <IconButton icon={<DeleteIcon />} actionText='delete'/>
          </ActionArea>
          <Content>
            <NoteText>{note.content}</NoteText>
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
  max-height: 80vh;
  flex-wrap: wrap;
`
const NoteCard = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
  width: 300px;
  cursor: pointer;
  margin: 5px 5px 0;
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
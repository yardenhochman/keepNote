import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from './iconButton';
import styled from 'styled-components';
import { dateDisplay } from '../utils/dateUtils';

const NotesList = ({ noteList }) => {
  return (
    <ListOfNotes>
      {noteList.map(note=>(
        <Card key={note.content+note.date} variant="outlined">
          <FooterArea>
            <IconButton icon={<EditIcon />} actionText='Edit'/>
            <IconButton icon={<DeleteIcon />} actionText='delete'/>
          </FooterArea>
          <Content>
            <NoteText>{note.content}</NoteText>
          </Content>
        <Header>
          <Author>{note.author}</Author>
          <DateText>{dateDisplay(note.date)}</DateText>
        </Header>
        </Card>
      ))}
    </ListOfNotes>
  )
  
}

export default NotesList

const ListOfNotes = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 0 10px;
`
const Card = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
  width: 300px;
`
const Header = styled.div`
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

const FooterArea = styled.div`
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
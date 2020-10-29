import { useRecoilState, useRecoilValue } from 'recoil';
import React from 'react'
import { noteListState, userState } from '../state'


export const useFillNotesFromStorage = () => {
  const setNoteList = useRecoilState(noteListState)[1];
  const user = useRecoilValue(userState);

  React.useEffect(()=>{
    const unparsedItem = localStorage.getItem('noteListState');
    if (unparsedItem) {
      setNoteList(JSON.parse(unparsedItem)[user?.id] || [])
    }
  },[setNoteList, user?.id])
}

export const useFocusElement = () => {
  const ref = React.useRef()
  React.useEffect(()=>{
    ref.current?.focus()
  },[])
  return ref
}
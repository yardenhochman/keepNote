import { useRecoilState } from 'recoil';
import React from 'react'
import { noteListState } from '../state'


export const useFillNotesFromStorage = () => {
  const setNoteList = useRecoilState(noteListState)[1];

  React.useEffect(()=>{
    const unparsedItem = localStorage.getItem('noteListState');
    if (unparsedItem) {
      setNoteList(JSON.parse(unparsedItem))
    }
  },[setNoteList])
}

export const useFocusElement = () => {
  const ref = React.useRef()
  React.useEffect(()=>{
    ref.current?.focus()
  },[])
  return ref
}
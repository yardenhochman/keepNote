import {
  atom,
  selector,
  useRecoilTransactionObserver_UNSTABLE,
  useRecoilValue,
  useRecoilState
} from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { sortByDate } from './utils/dateUtils'
import React from 'react'

export const selectedNote = atom({
  key: 'selectedNote',
  default: false
})

export const openModal = atom({
  key: 'openModal',
  default: false
})

const exampleNote = {
  author: 'Yarden Hochman', content: 'example of a note', date: new Date(), id: uuidv4()
}

export const noteListState = atom({
  key: 'noteListState', // unique ID (with respect to other atoms/selectors)
  default: [exampleNote], // default value (aka initial value)
});

export const userState = atom({
  key: 'user',
  default: JSON.parse(localStorage.getItem('user')) || false
})

export const userName = selector({
  key: 'userName',
  get: ({ get }) => get(userState)?.name
})

export const getNoteListById = selector({
  key: 'noteListById',
  get: ({ get }) => {
    const list = get(noteListState);
    return list.reduce((acc,note,index) => {
      acc[note.id] = {...note, index}
      return acc;
    },{})
  }
})

export const getSortedNoteList = selector({
  key: 'getSortedNoteList',
  get: ({ get }) => {
    const list = get(noteListState);
    return [...list].sort(sortByDate)
  }
})


export const usePersistenceObserver = () => {
  const user = useRecoilValue(userState);
  useRecoilTransactionObserver_UNSTABLE(({snapshot}) => {

    for (const modifiedAtom of snapshot.getNodes_UNSTABLE({isModified: true})) {
      const atomLoadable = snapshot.getLoadable(modifiedAtom);
      if (atomLoadable.state === 'hasValue' && user?.id && modifiedAtom.key !== 'user') {
        
        const allUsersData = JSON.parse(localStorage.getItem(modifiedAtom.key)) || {}
        allUsersData[user.id] = atomLoadable.contents
        localStorage.setItem(
          modifiedAtom.key,
          JSON.stringify(allUsersData),
        );
      }
    }
  });
}

export const useFillNotesFromStorage = () => {
  const setNoteList = useRecoilState(noteListState)[1];
  const user = useRecoilValue(userState);

  React.useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(user));
  },[user])

  React.useEffect(()=>{
    const unparsedItem = localStorage.getItem('noteListState');
    if (unparsedItem) {
      setNoteList(JSON.parse(unparsedItem)[user?.id] || [])
    }
  },[setNoteList, user?.id])
}
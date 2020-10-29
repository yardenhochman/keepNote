import {
  atom,
  selector,
  useRecoilTransactionObserver_UNSTABLE
} from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { sortByDate } from './utils/dateUtils'


export const selectedNote = atom({
  key: 'selectedNote',
  default: false
})

export const openModal = atom({
  key: 'openModal',
  default: false
})

const exampleNote = {
  author: 'Yarden Hochman', content: 'testing notes list', date: new Date(), id: uuidv4()
}

export const noteListState = atom({
  key: 'noteListState', // unique ID (with respect to other atoms/selectors)
  default: [exampleNote], // default value (aka initial value)
});

export const userState = atom({
  key: 'user',
  default: {}
})

export const userName = selector({
  key: 'userName',
  get: ({ get }) => {
    const user = get(userState);
    return user?.name
  }
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


export const PersistenceObserver = () => {
  useRecoilTransactionObserver_UNSTABLE(({snapshot}) => {
    for (const modifiedAtom of snapshot.getNodes_UNSTABLE({isModified: true})) {
      const atomLoadable = snapshot.getLoadable(modifiedAtom);
      if (atomLoadable.state === 'hasValue') {
        localStorage.setItem(
          modifiedAtom.key,
          JSON.stringify(atomLoadable.contents),
        );
      }
    }
  });
}


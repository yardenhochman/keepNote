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
  default: [
    {
      "content": "esgseg",
      "author": "Yarden Hochman",
      "date": "2020-10-26T14:13:30.342Z",
      "id": "4f692a1b-9345-4734-99ef-8b7a1dd202d5"
    },
    {
      "content": "fdsaf",
      "author": "Yarden Hochman",
      "date": "2020-10-21T14:13:40.667Z",
      "id": "6d149f5f-8758-4231-8312-1edb9281eda8"
    },
    {
      "content": "esafawf3w faa fasf waf a ",
      "author": "Yarden Hochman",
      "date": "2020-10-26T14:13:44.190Z",
      "id": "a8cc5b54-c664-43c8-ba17-c6c0ba02965d"
    },
    {
      "content": "adsad",
      "author": "Yarden Hochman",
      "date": "2020-10-26T14:13:46.870Z",
      "id": "3f4668cc-416d-43f5-b799-c2eeac888457"
    },
    {
      "content": "test3 resafesa ffes feasf eawsfasef esafsa fsa fesafesafesa fesa fesa fesa feasewsafesa fesaf esaf esafesafsafe afeas",
      "author": "Yarden Hochman",
      "date": "2020-10-26T14:13:49.834Z",
      "id": "d2b40df0-32fc-4633-b196-30ab36d6fb73"
    }
  ], // default value (aka initial value)
});

export const userState = atom({
  key: 'user',
  default: {
    name: 'Yarden Hochman',
    id: uuidv4()
  }
})

export const userName = selector({
  key: 'userName',
  get: ({get}) => {
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


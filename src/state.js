import {
  atom,
} from 'recoil';


const exampleNote = {
  author: 'Yarden Hochman', content: 'testing notes list', date: new Date()
}

export const noteListState = atom({
  key: 'noteListState', // unique ID (with respect to other atoms/selectors)
  default: [exampleNote], // default value (aka initial value)
});
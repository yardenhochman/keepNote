import {
  atom,
} from 'recoil';

export const noteListState = atom({
  key: 'noteListState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
import { atom, selector } from "recoil";

export interface ITodo {
  id: string;
  text: string;
}

interface ItodoState {
  [key: string]: ITodo[];
}
export const todoState = atom<ItodoState>({
  key: "todos",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});

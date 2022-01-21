import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
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

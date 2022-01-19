import { atom, selector } from "recoil";
interface ItodoState {
  [key: string]: string[];
}
export const todoState = atom<ItodoState>({
  key: "todos",
  default: {
    "To Do": ["고산하", "김채은"],
    Doing: ["바보", "천재"],
    Done: ["이것은 불변의 진리"],
  },
});

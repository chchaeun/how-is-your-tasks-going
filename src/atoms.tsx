import { atom, selector } from "recoil";

export interface ITodo {
  text: string;
  category: "TODO" | "DOING" | "DONE";
  id: number;
}

export const todoState = atom<ITodo[]>({
  key: "todo",
  default: [],
});
export const categoryState = atom({
  key: "category",
  default: "TODO",
});
export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});

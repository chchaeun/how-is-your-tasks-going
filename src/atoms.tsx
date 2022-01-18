import { atom, selector } from "recoil";

export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
  "DELETED" = "DELETED",
}

export interface ITodo {
  text: string;
  id: number;
  category: Categories;
}

export const todoState = atom<ITodo[]>({
  key: "todo",
  default: JSON.parse(localStorage.getItem("todo") as any) || [],
});
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
});
export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});

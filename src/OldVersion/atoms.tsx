import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
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
  key: "todo_v1",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const categoryState = atom<Categories>({
  key: "category_v1",
  default: Categories.TODO,
  effects_UNSTABLE: [persistAtom],
});
export const todoSelector = selector({
  key: "todoSelector_v1",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});

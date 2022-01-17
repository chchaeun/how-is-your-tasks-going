import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, todoSelector, todoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./Todo";

const ToDoList = () => {
  const todos = useRecoilValue(todoSelector);
  const setCategory = useSetRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h2>To do</h2>
      <hr />
      <select onInput={onInput}>
        <option value={Categories.TODO}>To do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {todos.map((todo) => (
        <ToDo key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default ToDoList;

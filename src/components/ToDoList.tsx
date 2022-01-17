import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useRecoilState } from "recoil";
import { categoryState, todoSelector, todoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./Todo";

const ToDoList = () => {
  const todos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  return (
    <div>
      <h2>To do</h2>
      <hr />
      <select onInput={onInput}>
        <option value="TODO">To do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo />
      {todos.map((todo) => (
        <ToDo key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default ToDoList;

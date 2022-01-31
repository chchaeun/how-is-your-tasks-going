import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, todoSelector, todoState } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./Todo";
const Wrapper = styled.div`
  padding: 100px 300px;
  text-align: center;
`;

const CategorySelect = styled.select`
  margin: 10px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const ToDoList = () => {
  const todos = useRecoilValue(todoSelector);
  const setCategory = useSetRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <Wrapper>
      <h2>To do</h2>
      <hr />
      <CategorySelect onInput={onInput}>
        <option value={Categories.TODO}>To do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </CategorySelect>
      <CreateToDo />
      {todos.map((todo) => (
        <ToDo key={todo.id} {...todo} />
      ))}
    </Wrapper>
  );
};

export default ToDoList;

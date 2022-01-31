import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, todoState } from "./atoms";

interface IForm {
  todo: string;
}

const TodoInput = styled.input`
  margin: 10px 0px;
  &:focus {
    outline: none;
  }
`;

function CreateToDo() {
  const [todos, setTodos] = useRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ todo }: IForm) => {
    setTodos((oldTodos) => [
      ...oldTodos,
      { text: todo, id: Date.now(), category },
    ]);
    setValue("todo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <TodoInput {...register("todo", { required: "To do is required" })} />
      <button style={{ cursor: "pointer" }}>submit</button>
    </form>
  );
}

export default CreateToDo;

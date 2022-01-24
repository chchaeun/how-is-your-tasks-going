import React from "react";
import { useForm } from "react-hook-form";
import { boardState, todoState } from "../atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Wrapper } from "../App";

interface IBoardForm {
  nboard: string;
}
const BoardForm = styled.form`
  input {
    border: none;
    border-bottom: solid 2px;
    background-color: transparent;
    text-align: center;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: black;
      text-align: center;
      font-family: "Quicksand";
      font-weight: 500;
    }
  }
`;

function CreateBoard() {
  const setTodos = useSetRecoilState(todoState);
  const [boards, setBoards] = useRecoilState(boardState);
  const { register, setValue, handleSubmit } = useForm<IBoardForm>();
  const onValid = ({ nboard }: IBoardForm) => {
    if (boards.length == 6) {
      alert("Up to six boards can be created.");
      setValue("nboard", "");
      return;
    }
    if (boards.includes(nboard)) {
      alert("The same board already exists.");
      setValue("nboard", "");
      return;
    }
    setTodos((prev) => {
      return {
        ...prev,
        [nboard]: [],
      };
    });
    setBoards((prev) => [...prev, nboard]);
    setValue("nboard", "");
  };
  return (
    <BoardForm onSubmit={handleSubmit(onValid)}>
      <input
        {...register("nboard", { required: "New Board is required" })}
        type="text"
        placeholder="New Board"
      />
    </BoardForm>
  );
}

export default CreateBoard;

import React from "react";
import { useForm } from "react-hook-form";
import { todoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Wrapper } from "../App";

interface IBoardForm {
  board: string;
}
const BoardForm = styled.form`
  margin: 10px 0px;
`;

function CreateBoard() {
  const setTodos = useSetRecoilState(todoState);
  const { register, setValue, handleSubmit } = useForm<IBoardForm>();
  const onValid = ({ board }: IBoardForm) => {
    setTodos((Boards) => {
      return {
        ...Boards,
        [board]: [],
      };
    });
    setValue("board", "");
  };
  return (
    <Wrapper>
      <BoardForm onSubmit={handleSubmit(onValid)}>
        <input
          {...register("board", { required: true })}
          type="text"
          placeholder="New Board"
        />
        <button>Submit</button>
      </BoardForm>
    </Wrapper>
  );
}

export default CreateBoard;

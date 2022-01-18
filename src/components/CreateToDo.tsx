import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, todoState } from "../atoms";

interface IForm {
  todo: string;
}
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
      <input {...register("todo", { required: "To do is required" })} />
      <button>submit</button>
    </form>
  );
}

export default CreateToDo;

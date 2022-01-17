import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { todoState } from "../atoms";

interface IForm {
  todo: string;
}
function CreateToDo() {
  const setTodos = useSetRecoilState(todoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = ({ todo }: IForm) => {
    setTodos((oldTodos) => [
      ...oldTodos,
      { text: todo, id: Date.now(), category: "TODO" },
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

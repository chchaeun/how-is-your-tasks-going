import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Categories, ITodo, todoState } from "../atoms";

function ToDo({ text, category, id }: ITodo) {
  const [todos, setTodos] = useRecoilState(todoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      const newTodo = { text, id, category: name as any };
      return [
        ...oldTodos.slice(0, targetIndex),
        newTodo,
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos]);
  return (
    <li>
      {text}
      {category !== Categories.TODO && (
        <button name={Categories.TODO} onClick={onClick}>
          TO DO
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          DOING
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          DONE
        </button>
      )}
      <button name={Categories.DELETED} onClick={onClick}>
        DELETE
      </button>
    </li>
  );
}

export default ToDo;

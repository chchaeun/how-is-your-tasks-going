import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, ITodo, todoState } from "./atoms";

const Button = styled.button`
  background-color: #b6ddff;
  border: none;
  border-radius: 10px;
  margin: 5px;
  cursor: pointer;
`;

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
        <Button name={Categories.TODO} onClick={onClick}>
          TO DO
        </Button>
      )}
      {category !== Categories.DOING && (
        <Button name={Categories.DOING} onClick={onClick}>
          DOING
        </Button>
      )}
      {category !== Categories.DONE && (
        <Button name={Categories.DONE} onClick={onClick}>
          DONE
        </Button>
      )}
      <Button name={Categories.DELETED} onClick={onClick}>
        DELETE
      </Button>
    </li>
  );
}

export default ToDo;

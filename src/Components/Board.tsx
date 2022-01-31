import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { boardState, ITodo, todoState } from "../atoms";
import DraggableCard from "./DraggableCard";
import { useSetRecoilState } from "recoil";
import { MdDelete } from "react-icons/md";
import { Area, Container, Title } from "../Elements";

interface IForm {
  todo: string;
}

interface IBoard {
  boardId: string;
  todos: ITodo[];
  idx: number;
}

const Form = styled.form`
  width: 100%;
  input {
    position: relative;
    width: 100%;
    border: none;
    border-bottom: solid #ff8f8f 2px;
    background-color: transparent;
    text-align: center;
    color: #ff5757;

    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #ff5757;
      text-align: center;
      font-family: "Quicksand";
      font-weight: 500;
    }
  }
`;

function Board({ boardId, todos, idx }: IBoard) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setTodoState = useSetRecoilState(todoState);
  const setBoardState = useSetRecoilState(boardState);
  const onValid = ({ todo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: todo,
    };
    setTodoState((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newTodo],
      };
    });
    setValue("todo", "");
  };
  const onDeleteClick = (e: React.FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setBoardState((prev) => prev.filter((value) => value !== name));
    setTodoState((prev) => {
      const copyPrev = { ...prev };
      delete copyPrev[name];
      return copyPrev;
    });
  };
  return (
    <Draggable draggableId={boardId + ""} index={idx}>
      {(magic) => (
        <Container ref={magic.innerRef} {...magic.draggableProps}>
          <Title {...magic.dragHandleProps}>
            {boardId}
            <button name={boardId} onClick={onDeleteClick}>
              <MdDelete size="20" />
            </button>
          </Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("todo", { required: "New task is required" })}
              type="text"
              placeholder={`Add task`}
            />
          </Form>
          <Droppable droppableId={boardId}>
            {(magic, snapshot) => (
              <Area
                ref={magic.innerRef}
                {...magic.droppableProps}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {todos.map((todo, idx) => (
                  <DraggableCard
                    key={todo.id}
                    todoId={todo.id}
                    todoText={todo.text}
                    idx={idx}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
}

export default React.memo(Board);

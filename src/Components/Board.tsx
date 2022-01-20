import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodo } from "../atoms";
import DraggableCard from "./DraggableCard";
const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
interface IBoard {
  boardId: string;
  todos: ITodo[];
}
interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#7C99AC"
      : props.isDraggingFromThis
      ? "#b2c1ce"
      : "transparent"};
  transition: background-color 0.25s ease-in-out;
  flex-grow: 1;
  padding: 20px;
`;

function Board({ boardId, todos }: IBoard) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
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
    </Wrapper>
  );
}

export default Board;

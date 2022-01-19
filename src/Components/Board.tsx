import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
interface IBoard {
  droppableId: string;
  todos: string[];
}
function Board({ droppableId, todos }: IBoard) {
  return (
    <Wrapper>
      <Title>{droppableId}</Title>
      <Droppable droppableId={droppableId}>
        {(magic) => (
          <div ref={magic.innerRef} {...magic.droppableProps}>
            {todos.map((todo, idx) => (
              <DraggableCard key={todo} todo={todo} idx={idx} />
            ))}
            {magic.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;

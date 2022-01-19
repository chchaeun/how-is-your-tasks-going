import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { todoState } from "./atoms";
import { useRecoilState } from "recoil";
import DraggableCard from "./Components/DraggableCard";
import Board from "./Components/Board";
const Wrapper = styled.div`
  display: flex;
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [todos, setTodos] = useRecoilState(todoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source, draggableId } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setTodos((Boards) => {
        const boardCopy = [...Boards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...Boards,
          [source.droppableId]: boardCopy,
        };
      });
    } else {
      setTodos((Boards) => {
        const sourceCopy = [...Boards[source.droppableId]];
        const destCopy = [...Boards[destination.droppableId]];
        sourceCopy.splice(source.index, 1);
        destCopy.splice(destination?.index, 0, draggableId);
        return {
          ...Boards,
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: destCopy,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map((key) => (
            <Board key={key} droppableId={key} todos={todos[key]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

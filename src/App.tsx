import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodo, todoState } from "./atoms";
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
    console.log(info);
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setTodos((Boards) => {
        const boardCopy = [...Boards[source.droppableId]];
        const ObjectCopy = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, ObjectCopy);
        return {
          ...Boards,
          [source.droppableId]: boardCopy,
        };
      });
    } else {
      setTodos((Boards) => {
        const sourceCopy = [...Boards[source.droppableId]];
        const destCopy = [...Boards[destination.droppableId]];
        const ObjectCopy = sourceCopy[source.index];

        sourceCopy.splice(source.index, 1);
        destCopy.splice(destination?.index, 0, ObjectCopy);
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
          {Object.keys(todos).map((boardId) => (
            <Board key={boardId} boardId={boardId} todos={todos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

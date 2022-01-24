import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { boardState, ITodo, todoState } from "./atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import DraggableCard from "./Components/DraggableCard";
import Board, { Title } from "./Components/Board";
import TrashCan from "./Components/TrashCan";
import { useForm } from "react-hook-form";
import CreateBoard from "./Components/CreateBoard";
import TitleImg from "./image/title.png";
import BackgroundImg from "./image/background.jpg";

export const Wrapper = styled.div`
  display: flex;
  width: 90vw;
  height: 80vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;
const AppTitle = styled.div`
  top: 10%;
  text-align: center;
  font-size: 20pt;
  font-weight: 600;
  img {
    width: 50px;
    position: relative;
    top: 15px;
  }
`;
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-image: url(${BackgroundImg});
  opacity: 0.5;
  background-size: 100%;
  z-index: -10;
`;
function App() {
  const [todos, setTodos] = useRecoilState(todoState);
  const [boards, setBoards] = useRecoilState<string[]>(boardState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source, draggableId } = info;
    console.log(info);
    if (!destination) return;
    if (destination?.droppableId === "dropBoard") {
      setBoards((oldBoards) => {
        const boardCopy = [...oldBoards];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return boardCopy;
      });
    } else if (destination?.droppableId === "trash") {
      setTodos((Boards) => {
        const boardCopy = [...Boards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return {
          ...Boards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (destination?.droppableId === source.droppableId) {
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
    <>
      <Background>
        <a href="https://.pngtree.com/free-backgrounds">
          Free Background Image .pngtree.com/
        </a>
      </Background>
      <AppTitle>
        How is your tasks going?
        <img src={TitleImg} />
        <CreateBoard />
      </AppTitle>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Droppable
            droppableId="dropBoard"
            direction="horizontal"
            type="board"
          >
            {(magic) => (
              <Boards ref={magic.innerRef} {...magic.droppableProps}>
                {boards?.map((boardId, idx) => (
                  <Board
                    key={boardId}
                    idx={idx}
                    boardId={boardId}
                    todos={todos[boardId]}
                  />
                ))}
                {magic.placeholder}
              </Boards>
            )}
          </Droppable>
        </Wrapper>
        <TrashCan />
      </DragDropContext>
    </>
  );
}

export default App;

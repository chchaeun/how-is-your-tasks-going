import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Area, Title } from "./Board";

const TrashWrapper = styled.div`
  position: fixed;
  left: 80%;
  top: 10%;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 10px;
  padding: 10px;
`;
function TrashCan() {
  return (
    <TrashWrapper style={{ margin: "10px" }}>
      <Title>Trash Can</Title>
      <Droppable droppableId="trash">
        {(magic, snapshot) => (
          <Area
            ref={magic.innerRef}
            {...magic.droppableProps}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            isDraggingOver={snapshot.isDraggingOver}
          ></Area>
        )}
      </Droppable>
    </TrashWrapper>
  );
}

export default TrashCan;

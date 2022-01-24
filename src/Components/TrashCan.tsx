import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled, { keyframes } from "styled-components";
import { Area, Title } from "./Board";
import Dragging from "../image/dragging.png";
import Undragging from "../image/undragging.png";
const TrashWrapper = styled.div`
  position: fixed;
  left: 0%;
  top: 3%;
  background-color: none;
  border-radius: 5px;
  min-width: 100px;
  min-height: 60px;
  padding: 10px;
`;

const TrashArea = styled(Area)`
  padding: 0px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;
const TrashTitle = styled(Title)`
  font-weight: 500;
`;
const TrashImg = styled.img`
  width: 50px;
`;

function TrashCan() {
  return (
    <TrashWrapper style={{ margin: "10px" }}>
      <TrashTitle>Throw away the task!</TrashTitle>
      <Droppable droppableId="trash">
        {(magic, snapshot) => (
          <TrashArea
            ref={magic.innerRef}
            {...magic.droppableProps}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {snapshot.isDraggingOver ? (
              <TrashImg src={Dragging} />
            ) : (
              <TrashImg src={Undragging} />
            )}
          </TrashArea>
        )}
      </Droppable>
    </TrashWrapper>
  );
}

export default TrashCan;

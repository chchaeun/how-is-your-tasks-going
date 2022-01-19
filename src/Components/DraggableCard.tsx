import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;
interface IDraggableCard {
  todo: string;
  idx: number;
}
function DraggableCard({ todo, idx }: IDraggableCard) {
  console.log("render ", todo);
  return (
    <Draggable key={todo} draggableId={todo} index={idx}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);

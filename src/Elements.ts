import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 90vw;
  height: 80vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Container = styled.div`
  width: 300px;
  padding: 10px 0px;
  padding-bottom: 0;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-right: 15px;
`;
export const Title = styled.h2`
  text-align: center;
  font-weight: 500;
  margin-bottom: 10px;
  font-size: 18px;
  button {
    position: relative;
    left: 10%;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0px;
    svg {
      position: relative;
      padding: 0px;
      left: 10px;
      top: 4px;
    }
  }
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

export const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#ffa3a3"
      : props.isDraggingFromThis
      ? "#ffecec"
      : "transparent"};
  transition: background-color 0.25s ease-in-out;
  flex-grow: 1;
  padding: 20px;
`;

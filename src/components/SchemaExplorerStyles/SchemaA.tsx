import styled from 'styled-components';

const SchemaAContainer = styled.div<{ x: number; y: number }>`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: lightblue;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: grab;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;

  span {
    font-weight: bold;
    font-size: 16px;
    color: #333;
  }
`;

export default SchemaAContainer;
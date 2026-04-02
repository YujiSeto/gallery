import styled from "styled-components";

export const Container = styled.div`
  background-color: #3d3f43;
  border-radius: 10px;
  padding: 10px;
  position: relative;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  img {
    max-width: 100%;
    display: block;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  button {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #f44336;
    border: 0;
    color: #fff;
    width: 24px;
    height: 24px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s;

    &:hover {
      background-color: #c62828;
      transform: scale(1.1);
    }
  }

  &:hover button {
    opacity: 1;
  }
`;


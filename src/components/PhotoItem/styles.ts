import styled from "styled-components";

export const Container = styled.div`
  background-color: #3d3f43;
  border-radius: 10px;
  padding: 10px;

  img {
    max-width: 100%;
    display: block;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  button {
    background-color: #7569f4;
    border: 0;
    color: #fff;
    padding: 8px 16px;
    font-size: 15px;
    border-radius: 10px;
    margin: 0 20px;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }
`;

import styled from "styled-components";

export const Container = styled.div`
  background-color: #27282f;
  color: #fff;
  min-height: 100vh;
`;

export const Area = styled.div`
  margin: auto;
  max-width: 980px;
  padding: 30px 0;
  position: relative;
`;

export const Header = styled.h1`
  margin: 0;
  padding: 0;
  text-align: center;
  margin-bottom: 30px;
`;

export const ScreenWarning = styled.div`
  text-align: center;
  .emoji {
    font-size: 50px;
    margin-bottom: 20px;
  }
`;

export const PhotoList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

export const UploadForm = styled.form`
  background-color: #3d3f43;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 30px;

  input[type="submit"] {
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
export const StatusIndicator = styled.div<{
  $status: "online" | "offline" | "warning" | "checking";
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${(props) => {
    if (props.$status === "online") return "rgba(76, 175, 80, 0.2)";
    if (props.$status === "warning") return "rgba(255, 152, 0, 0.2)";
    if (props.$status === "checking") return "rgba(33, 150, 243, 0.2)";
    return "rgba(244, 67, 54, 0.2)";
  }};
  color: ${(props) => {
    if (props.$status === "online") return "#4CAF50";
    if (props.$status === "warning") return "#FF9800";
    if (props.$status === "checking") return "#2196F3";
    return "#f44336";
  }};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid
    ${(props) => {
      if (props.$status === "online") return "#4CAF50";
      if (props.$status === "warning") return "#FF9800";
      if (props.$status === "checking") return "#2196F3";
      return "#f44336";
    }};
  position: absolute;
  top: 30px;
  right: 0;
  transition: all 0.3s ease;
`;

export const StatusDot = styled.div<{
  $status: "online" | "offline" | "warning" | "checking";
}>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => {
    if (props.$status === "online") return "#4CAF50";
    if (props.$status === "warning") return "#FF9800";
    if (props.$status === "checking") return "#2196F3";
    return "#f44336";
  }};
  box-shadow: 0 0 8px
    ${(props) => {
      if (props.$status === "online") return "#4CAF50";
      if (props.$status === "warning") return "#FF9800";
      if (props.$status === "checking") return "#2196F3";
      return "#f44336";
    }};
`;

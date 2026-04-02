import styled, { keyframes } from "styled-components";


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
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;


  input[type="file"] {
    display: none;
  }

  label {
    background-color: #7569f4;
    border: 0;
    color: #fff;
    padding: 8px 16px;
    font-size: 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }

  input[type="text"] {
    flex: 1;
    background-color: #3d3f43;
    border: 1px solid #7569f4;
    color: #fff;
    padding: 8px 16px;
    font-size: 15px;
    border-radius: 10px;
    outline: none;
    min-width: 200px;

    &::placeholder {
      color: #999;
    }
  }

  button {
    background-color: #7569f4;
    border: 0;
    color: #fff;
    padding: 8px 16px;
    font-size: 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: opacity 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-width: 100px;
    height: 38px;

    &:hover {
      opacity: 0.9;
    }

    &:disabled {
      background-color: #444;
      color: #777;
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${rotate} 0.6s linear infinite;
`;



export const StatusIndicator = styled.div<{
  $status: "online" | "offline" | "warning" | "checking" | "demo";
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${(props) => {
    if (props.$status === "online") return "rgba(76, 175, 80, 0.2)";
    if (props.$status === "warning") return "rgba(255, 152, 0, 0.2)";
    if (props.$status === "checking") return "rgba(33, 150, 243, 0.2)";
    if (props.$status === "demo") return "rgba(0, 188, 212, 0.2)";
    return "rgba(244, 67, 54, 0.2)";
  }};
  color: ${(props) => {
    if (props.$status === "online") return "#4CAF50";
    if (props.$status === "warning") return "#FF9800";
    if (props.$status === "checking") return "#2196F3";
    if (props.$status === "demo") return "#00BCD4";
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
      if (props.$status === "demo") return "#00BCD4";
      return "#f44336";
    }};
  position: absolute;

  top: 30px;
  right: 0;
  transition: all 0.3s ease;
`;

export const StatusDot = styled.div<{
  $status: "online" | "offline" | "warning" | "checking" | "demo";
}>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => {
    if (props.$status === "online") return "#4CAF50";
    if (props.$status === "warning") return "#FF9800";
    if (props.$status === "checking") return "#2196F3";
    if (props.$status === "demo") return "#00BCD4";
    return "#f44336";
  }};
  box-shadow: 0 0 8px
    ${(props) => {
      if (props.$status === "online") return "#4CAF50";
      if (props.$status === "warning") return "#FF9800";
      if (props.$status === "checking") return "#2196F3";
      if (props.$status === "demo") return "#00BCD4";
      return "#f44336";
    }};
`;

export const PreviewImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid #7569f4;
  background-color: #333;
`;


export const DemoButton = styled.button`
  background-color: #3d3f43;
  border: 1px solid #7569f4;
  color: #7569f4;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 20px;
  cursor: pointer;
  position: absolute;
  top: 30px;
  left: 0;
  transition: all 0.3s ease;

  &:hover {
    background-color: #7569f4;
    color: #fff;
  }
`;


import bg from "@/app/Sub_Header.svg";
import styled from "styled-components";

export const StyledShipWrapper = styled.div`
  width: 99%;
  height: 55px;
  padding: 0px 10px 0px 0px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  position: fixed;
  z-index: 99;
  background-image:url(${bg.src});
  background-repeat: no-repeat !important;
  background-size: cover;
  background-position: right;
`;

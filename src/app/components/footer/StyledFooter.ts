import { styled } from "styled-components";
import footer from "@/app/footerBg.svg";

export const StyledFooter = styled.div`
  align-items: center;
  z-index: 100;
  color: #ffffff
  display: flex;
  font-size: 12px;
  width:100%;
  justify-content: center;
  align-items:center;
  padding: 0px 60px;
  font-weight: 600;
   background-image: url(${footer.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  height: 55px;
  .privacy,
  .copyright,
  .version {
    cursor: pointer;
  }
  a {
    text-decoration: underline;
    color:#ffffff;
  }
`;
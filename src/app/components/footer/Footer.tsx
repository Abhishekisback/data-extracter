"use client";
import React from "react";
import { StyledFooter } from "./StyledFooter";
import { Box } from "@mui/material";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <StyledFooter>
      <Box display={"flex"} justifyContent={"space-between"} color={"#ffffff"} height={"55px"} alignItems={"center"}>
        <a href="#" className="privacy">
          {""}
        </a>
        <p className="copyright">
          {"Copyright @"}
          {year}

          <span> {"Prodigy Marine Solutions"}</span>
        </p>
        <p className="version">
          {"Version" + " " + "1.0.0"}
        </p>
      </Box>
    </StyledFooter>
  );
};

export default Footer;

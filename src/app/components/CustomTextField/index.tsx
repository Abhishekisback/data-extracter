"use client";
import React, { useEffect, useState } from "react";
import {
  StyledTextField,
  StyledTextFieldWrapper,
} from "./CustomTextFieldStyled";
import { Tooltip } from "@mui/material";
interface CustomTextFieldProps {
  isAvailable?: boolean;
  placeHolder: string;
  OnChange: (value: string) => void;
  id: string;
  type: string;
  name: string;
  customStyles?: {
    [key: string]: string;
  };
  hoverStyles?: {
    [key: string]: string;
  };
  focusStyles?: {
    [key: string]: string;
  };
  value?: string;
  isDisabled?: boolean;
  charLimit?: number;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  isAvailable = true,
  placeHolder,
  OnChange,
  id,
  type,
  name,
  customStyles,
  hoverStyles,
  focusStyles,
  value = "",
  isDisabled = false,
  charLimit,
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue.length > 0 && value === "") setInputValue("");
    if (value) setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type == "number" || type == "numberic") {
      const value = e.target.value;
      const regex = /^\d*\.?\d{0,2}$/;
      if (regex.test(value) || value === "") {
        setInputValue(value);
        OnChange(value);
      }
    } else if (type == "integer") {
      const inputValue = e.target.value;
      const newValue = inputValue.replace(/[^\d]/g, "");
      setInputValue(newValue);
      OnChange(newValue);
    } else if (type == "numCharOnly") {
      const value = e.target.value;
      const regex = /^[A-Za-z0-9-]+$/;
      if (regex.test(value) || value === "") {
        setInputValue(value);
        OnChange(value);
      }
    } else {
      setInputValue(e.target.value);
      OnChange(e.target.value.trim());
    }
  };
  return (
    <Tooltip arrow title={isAvailable ? "" : "DEV_UNDER_PROCESS"}>
      <StyledTextFieldWrapper
        customStyles={customStyles}
        focusStyles={focusStyles}
        hoverStyles={hoverStyles}
        isDisabled={isDisabled}
      >
        <StyledTextField
          id={id}
          value={inputValue}
          type={type?.trim() !== "" ? type : "text"}
          min={type === "number" ? 0 : undefined}
          step={type === "number" ? 1 : ""}
          name={name}
          disabled={isDisabled}
          placeholder={placeHolder}
          customStyles={customStyles}
          onChange={handleInputChange}
          hoverStyles={hoverStyles}
          focusStyles={focusStyles}
          autoComplete="off"
          {...(charLimit !== null && { maxLength: charLimit })}
          {...(type === "number" &&
            type.trim() !== "" && {
              onInput: (e) => {
                let inputValue = (e.target as HTMLInputElement).value;
                // Allow only digits and one decimal point
                inputValue = inputValue
                  .replace(/[^0-9.]/g, "") // Remove non-numeric characters except '.'
                  .replace(/(\..*?)\./g, "$1"); // Allow only one decimal point // Limit to 6 characters
                (e.target as HTMLInputElement).value = inputValue;
              },
            })}
        />
      </StyledTextFieldWrapper>
    </Tooltip>
  );
};

export default CustomTextField;

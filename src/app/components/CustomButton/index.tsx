/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
interface CustomButtonProps {
  hoverStyles?: {
    [key: string]: string | any;
    otherStyles?: {
      [key: string]: string;
    };
  };
  focusStyles?: {
    [key: string]: string | any;
    otherStyles?: {
      [key: string]: string;
    };
  };
  id: string;
  startIcon?: string;
  isAvailable: boolean;
  btnText: string;
  customStyles?: {
    [key: string]: string | any;
    otherStyles?: {
      [key: string]: string;
    };
  };
  iconStyles?: {
    [key: string]: string | any;
    otherStyles?: {
      [key: string]: string;
    };
  };
  endIcon?: string;
  OnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  startIcon,
  id,
  endIcon,
  btnText,
  isAvailable = false,
  customStyles,
  OnClick,
  iconStyles,
  focusStyles,
  hoverStyles,
  disabled = false
}) => {
  return (
    <div>
      <Tooltip title={isAvailable ? "" : "NA"} arrow>
        <Button
          sx={{
            "&.MuiButtonBase-root": {
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              textTransform: "none",
              gap: customStyles?.gap ? customStyles.gap : "4px",
              height: customStyles?.height ? customStyles?.height : "100%",
              width: customStyles?.width ? customStyles?.width : "100%",
              padding: customStyles?.padding
                ? customStyles?.padding
                : "10px 12px",
              borderRadius: "4px",
              flexShrink: 0,
              backgroundColor: customStyles?.backgroundColor
                ? customStyles?.backgroundColor
                : "#FFF",
              border: customStyles?.border
                ? customStyles?.border
                : "1px solid#E0E0E0",
              color: customStyles?.color ? customStyles?.color : "#13A4CC",
              opacity: 1,
              fontFamily: customStyles?.fontFamily,
              cursor: "pointer",
              ...customStyles?.otherStyles,
              "&:hover": {
                backgroundColor: hoverStyles?.backgroundColor
                  ? hoverStyles.backgroundColor
                  : "#0D7491",
                border: hoverStyles?.border
                  ? hoverStyles.border
                  : " 1px solid #6F797C",
                boxShadow: hoverStyles?.boxShadow
                  ? hoverStyles.boxShadow
                  : "0px 4px 8px 0px rgba(0, 0, 0, 0.16)",
                ...hoverStyles?.otherStyles,
              },

              ":active": {
                border: focusStyles?.border
                  ? focusStyles.border
                  : "1px solid #0D7491;",
                backgroundColor: focusStyles?.backgroundColor
                  ? focusStyles.backgroundColor
                  : "#13A4CC",
                color: focusStyles?.color ? focusStyles.color : "#FFFFFF",
                ...focusStyles?.otherStyles,
              },
              ":focus-visible": {
                border: "2px solid #13A4CC",
                borderRadius: "6px",
              },

              "& .MuiButton-startIcon": {
                marginRight: customStyles?.gap ? customStyles?.gap : "4px",
              },
              "& .MuiButton-endIcon": {
                marginLeft: customStyles?.gap ? customStyles?.gap : "4px",
              },
            },
          }}
          startIcon={
            startIcon ? (
              <Image
                alt={`${id}-startIcon`}
                src={startIcon}
                style={{
                  width: iconStyles?.width ? iconStyles.width : "20px",
                  height: iconStyles?.height ? iconStyles.height : "20px",
                  cursor: "pointer",
                  ...iconStyles?.otherStyles,
                }}
              />
            ) : (
              ""
            )
          }
          endIcon={
            endIcon ? (
              <Image
                alt={`${id}-endIcon`}
                src={endIcon}
                style={{
                  width: iconStyles?.width ? iconStyles.width : "20px",
                  height: iconStyles?.height ? iconStyles.height : "20px",
                  cursor: "pointer",
                  ...iconStyles?.otherStyles,
                }}
              />
            ) : (
              ""
            )
          }
          variant="outlined"
          disabled={disabled}
          onClick={OnClick}
        >
          {btnText}
        </Button>
      </Tooltip>
    </div>
  );
};

export default CustomButton;

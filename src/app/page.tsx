/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/index.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import {
  Box,
  Button,
  Paper,
  Typography,
  Alert,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Upload as UploadIcon } from "@mui/icons-material";
import DataTable from "./Datatable";
import close from "@/app/close.svg";
import { StyledShipWrapper } from "./styled";
import CustomTextField from "./components/CustomTextField";
import Image from "next/image";
import logo from "@/app/p2p_logo.svg";
import Footer from "./components/footer/Footer";
// ---------- Types ----------
export interface SampleDataInterface {
  pages: Page[];
}

export interface Page {
  pageNumber: number;
  extractedText: string;
  keyValuePairs: Record<string, any>[];
  tables: Table[];
}

export interface Table {
  headers: string[];
  rows: string[][];
}

// ---------- Component ----------
export default function PDFExtractor() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setUploadProgress] = useState<number>(0);
  const [pageNo, setPageNumber] = useState<number>(0);
  const [extractedData, setExtractedData] =
    useState<SampleDataInterface | null>(null);
  const [error, setError] = useState<string | null>(null);

  const tenantConfig = {
    tenantId: "476d671c-fb81-4797-a8cd-31efb70cba60",
    locale: "en",
    timeZone: "IND",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a valid PDF file");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10 MB");
      return;
    }
    setFile(selectedFile);
    setFileName(selectedFile?.name);
    setError(null);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
    setError(null);
    setExtractedData(null);
  };

  const extractTextFromPDF = async (
    file: File,
    setUploadProgress: (progress: number) => void
  ): Promise<SampleDataInterface> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post<SampleDataInterface>(
        "https://p2p-office-api-dev.synergymarinetest.com/api/Textract/extract-text",
        formData,
        {
          headers: {
            tenant_id: tenantConfig.tenantId,
            locale: tenantConfig.locale,
            time_zone: tenantConfig.timeZone,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(progress);
            }
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      throw new Error("Failed to extract text from PDF.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setIsLoading(true);
    setError(null);
    setUploadProgress(0);
    setExtractedData(null);
    try {
      const apiResponse = await extractTextFromPDF(file, setUploadProgress);
      console.log(
        "API Response:",
        apiResponse?.pages?.filter((ele) => ele?.pageNumber == 2)
      );
      const filteredPages =
        pageNo > 0
          ? apiResponse.pages.filter((page) => page.pageNumber === pageNo)
          : apiResponse.pages;

      setExtractedData({
        pages: filteredPages.length > 0 ? filteredPages : [],
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <>
      {/* Page-level Loader */}
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <CircularProgress size={50} color="primary" />
        </Box>
      )}

      <Box
        position={"fixed"}
        pt={"20px"}
        pl={"40px"}
        sx={{ backgroundColor: "#f7f7f7" }}
        width={"100%"}
        zIndex={99}
        height={90}
      >
        <Image src={logo} alt="" width={140} height={80} />
      </Box>
      <StyledShipWrapper />

      <Box
        sx={{
          backgroundColor: "#f7f7f7",
          minHeight: "88vh",
          paddingTop: "100px",
        }}
      >
        <Box pl={"20px"} pr={"20px"}>
          <Paper elevation={0} sx={{ p: "20px" }}>
            <Typography
              gutterBottom
              sx={{ fontWeight: "bold", mb: 3, fontSize: "12px" }}
            >
              Vessel User Manual Data Extract
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "row", gap: 3 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  flexDirection: "column",
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<UploadIcon />}
                  sx={{
                    "&.MuiButtonBase-root": {
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      textTransform: "none",
                      gap: "4px",
                      height: "35px",
                      width: "180px",
                      padding: "10px 12px",
                      borderRadius: "4px",
                      flexShrink: 0,
                      backgroundColor: "#13a4cc",
                      border: "1px solid #13a4cc",
                      color: "#fffff",
                      opacity: 1,
                      fontFamily: "inherit",
                      cursor: "pointer",
                      fontSize: "12px",
                      "&:hover": {
                        backgroundColor: "#0D7491",
                        border: "1px solid #6F797C",
                        boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.16)",
                      },

                      ":active": {
                        border: "1px solid #0D7491",
                        backgroundColor: "#13A4CC",
                        color: "#FFFFFF",
                      },

                      ":focus-visible": {
                        border: "2px solid #13A4CC",
                        borderRadius: "6px",
                      },

                      "& .MuiButton-startIcon": {
                        marginRight: "4px",
                      },
                      "& .MuiButton-endIcon": {
                        marginLeft: "4px",
                      },
                    },
                  }}
                  disabled={isLoading}
                >
                  Upload PDF
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    hidden
                    required
                  />
                </Button>
                {fileName && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      border: "1px solid #13a4cc",
                      borderRadius: "6px",
                      padding: "4px",
                      cursor: "pointer",
                      height: "30px",
                    }}
                  >
                    <Tooltip title={fileName}>
                      <Typography
                        variant="body1"
                        sx={{ color: "#13a4cc", fontSize: "12px" }}
                        onClick={() => {
                          if (file) {
                            const fileURL = URL.createObjectURL(file);
                            window.open(fileURL, "_blank");
                          }
                        }}
                      >
                        {fileName?.slice(0, 20) + "..."}
                      </Typography>
                    </Tooltip>
                    <IconButton
                      onClick={handleRemoveFile}
                      size="small"
                      disabled={isLoading}
                    >
                      <Image src={close} width={20} height={20} alt="close" />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <CustomTextField
                OnChange={(number) => {
                  if (parseInt(number) > 0) {
                    setPageNumber(parseInt(number));
                  } else {
                    setPageNumber(0);
                  }
                }}
                id=""
                name=""
                placeHolder="Enter Page No"
                type="numeric"
                customStyles={{ width: "180px" }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading || !file}
                sx={{
                  "&.MuiButtonBase-root": {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    textTransform: "none",
                    gap: "4px",
                    height: "35px",
                    width: "180px",
                    padding: "10px 12px",
                    borderRadius: "4px",
                    flexShrink: 0,
                    backgroundColor: "#e1f3f9a6",
                    border: "1px solid #13a4cc",
                    color: "#13A4CC",
                    opacity: 1,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    fontSize: "12px",
                    "&:hover": {
                      backgroundColor: "#e1f3f9",
                      border: "1px solid #13a4cc",
                      boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.16)",
                      color: "#13a4cc",
                    },
                    ":active": {
                      border: "1px solid #0D7491",
                      backgroundColor: "#13A4CC",
                      color: "#FFFFFF",
                    },
                    ":focus-visible": {
                      border: "2px solid #13A4CC",
                      borderRadius: "6px",
                    },

                    "& .MuiButton-startIcon": {
                      marginRight: "4px",
                    },
                    "& .MuiButton-endIcon": {
                      marginLeft: "4px",
                    },
                  },
                }}
                endIcon={<UnarchiveIcon />}
              >
                {isLoading ? "Processing..." : "Extract Data"}
              </Button>
            </Box>
            {error && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {error}
              </Alert>
            )}
          </Paper>
          {/* Pass extracted data to table */}
          <DataTable pages={extractedData?.pages || []} />
        </Box>
      </Box>
      <Footer />
    </>
  );
}

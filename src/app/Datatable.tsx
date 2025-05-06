/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

"use client";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Paper, Button, Typography } from "@mui/material";
import excel from "@/app/excel.svg";
import download from "@/app/download.svg";
import Image from "next/image";
import NoData from "@/app/no_data.svg";
export interface SampleDataInterface {
  pages: Page[];
}

export interface Page {
  pageNumber: number;
  extractedText: string;
  keyValuePairs: Record<string, any>[]; // Empty objects in sample, adjust if schema is known
  tables: Table[];
}

export interface Table {
  headers: string[];
  rows: string[][];
}

const generateColumns = (headers: string[]) =>
  headers.map((header, index) => ({
    field: `col${index}`,
    headerName: header,
    flex: 1,
  }));

const generateRows = (rows: string[][], offset: number = 0) =>
  rows.map((row, index) =>
    row.reduce((acc, cell, idx) => {
      acc[`col${idx}`] = cell;
      acc.id = offset + index; // Ensure unique ID
      return acc;
    }, {} as { [key: string]: string | number })
  );

const DataGridTables = (dataFromApi: SampleDataInterface) => {
  // Step 1: Group tables by their headers
  const tableMap = new Map<string, { headers: string[]; rows: string[][] }>();
  dataFromApi.pages.forEach((page) => {
    page.tables.forEach((table) => {
      const key = JSON.stringify(table.headers); // Use headers as a unique key
      if (!tableMap.has(key)) {
        tableMap.set(key, { headers: table.headers, rows: [] });
      }
      tableMap.get(key)!.rows.push(...table.rows);
    });
  });

  return (
    <Box sx={{ pt: "20px" }}>
      {tableMap.size === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
            animation: "fadeIn 1s ease-in-out",
            backgroundColor:"#ffffff"
          }}
        >
          <Image src={NoData} alt="No data" width={150} height={150} />
          <Typography variant="h6" color="text.secondary">
            No Data Found
          </Typography>
        </Box>
      ) : (
        <>
          {[...tableMap.entries()].map(
            ([key, { headers, rows }], tableIndex) => {
              const columns = generateColumns(headers);
              const gridRows = generateRows(rows, tableIndex * 1000); // unique ID offset per table
              return (
                <Box key={key}>
                  {rows?.length > 2 && (
                    <Paper key={key} sx={{ mb: 4, p: 2 }}>
                      <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        width={"100%"}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          startIcon={
                            <Image
                              src={download}
                              width={20}
                              height={20}
                              alt="icon"
                            />
                          }
                          endIcon={
                            <Image
                              src={excel}
                              width={20}
                              height={20}
                              alt="icon"
                            />
                          }
                          disabled={dataFromApi?.pages?.length === 0}
                          sx={{
                            "&.MuiButtonBase-root": {
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              textTransform: "none",
                              gap: "4px",
                              height: "35px",
                              width: "auto",
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
                              alignSelf: "end",
                              "&:hover": {
                                backgroundColor: "#e1f3f9",
                                border: "1px solid #13a4cc",
                                boxShadow:
                                  "0px 4px 8px 0px rgba(0, 0, 0, 0.16)",
                                color: "#13a4cc",
                              },
                              ":active": {
                                border: "1px solid #0D7491",
                                backgroundColor: "#e1f3f9",
                                color: "#13a4cc",
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
                        >
                          Download
                        </Button>
                      </Box>
                      <Box sx={{ height: "45vh", width: "100%", pt: "10px" }}>
                        <DataGrid
                          rows={gridRows}
                          columns={columns}
                          checkboxSelection={false}
                          disableRowSelectionOnClick
                          disableColumnSelector
                          disableColumnFilter
                          disableColumnMenu
                          paginationMode="server"
                          sx={{
                            ".MuiDataGrid-footerContainer": {
                              display: "none",
                            },
                          }}
                        />
                      </Box>
                    </Paper>
                  )}
                </Box>
              );
            }
          )}
        </>
      )}
    </Box>
  );
};

export default DataGridTables;

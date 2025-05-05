/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

"use client";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Paper } from "@mui/material";

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
    <Box sx={{ pt:"20px" }}>
      {[...tableMap.entries()].map(([key, { headers, rows }], tableIndex) => {
        const columns = generateColumns(headers);
        const gridRows = generateRows(rows, tableIndex * 1000); // unique ID offset per table
        return (
          <Box key={key}>
            {rows?.length > 2 && (
              <Paper key={key} sx={{ mb: 4, p: 2 }}>
                <Typography variant="h6" gutterBottom></Typography>
                <Box sx={{ height: "50vh", width: "100%" }}>
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
      })}
    </Box>
  );
};

export default DataGridTables;

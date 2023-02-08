import React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditDressMUI from "./EditDressMUI";
import DeleteDressMUI from "./DeleteDressMUI";
import AddDressMUI from "./AddDressMUI";

export default function DressesTable(props) {
  const [rows, setRows] = useState([]);

  const fetchDresses = async () => {
    let fetchURL;
    if (props.collection == "") {
      fetchURL = "/api/dresses";
    } else {
      fetchURL = `/api/dresses/bycollection/${props.collection}`;
    }
    try {
      const response = await fetch(fetchURL);

      const fetchedData = await response.json();
      setRows(fetchedData.dresses);
    } catch (err) {
      alert("Server Error");
    }
  };

  useEffect(() => {
    fetchDresses();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{
        paddingBottom: "3em",
        borderRadius: "15 px",
        height: "100%",
        padding: "5px",
        overflowY: "scroll",
        minHeight: "100vh",
      }}
    >
      <Table
        aria-label="simple table"
        sx={{ overflowY: "scroll", minWidth: "650px" }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Name
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Price
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Category
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Collection
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Image
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Descritpion
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <AddDressMUI
                collection={props.collection}
                fetchDresses={fetchDresses}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" sx={{ fontSize: "1.1rem" }}>
                {row.name}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.1rem" }}>
                {row.price}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.1rem" }}>
                {row.category.name}
              </TableCell>{" "}
              <TableCell align="center" sx={{ fontSize: "1.1rem" }}>
                {row.Dcollection.name}
              </TableCell>
              <TableCell align="center">
                <img style={{ width: "100px" }} src={`/${row.image}`} />
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.1rem" }}>
                {row.description}
              </TableCell>
              <TableCell>
                <EditDressMUI data={row} fetchDresses={fetchDresses} />
              </TableCell>
              <TableCell>
                <DeleteDressMUI dressID={row._id} fetchDresses={fetchDresses} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

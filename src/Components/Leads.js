import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { API } from "../General/General";

function Leads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const getLeads = () => {
    fetch(`${API}/lead`, { method: "GET",
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    } })
      .then((response) => response.json())
      .then((result) => setLeads(result));
  };

  useEffect(() => getLeads(), []);
  return (
    <div>
      {leads.length > 0 ? (
        <Paper sx={{ width: 950 }} className="mx-auto mt-5">
          <TableContainer>
            <Table sx={{ minWidth: 300 }}>
              <TableHead>
                <TableRow>
                  {[
                    "#",
                    "Request Name",
                    "Created by",
                    "Status",
                    "See Workflow Action",
                  ].map((element, index) => {
                    return (
                      <TableCell key={index} align="center">
                        {element}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {leads.map((user, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.company}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.Status}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <div>Loading..</div>
      )}
    </div>
  );
}

export default Leads;

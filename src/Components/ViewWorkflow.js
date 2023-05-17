import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../General/General";
import { Table, TableBody, TableHead } from "@mui/material/";
import { TableCell, TableRow } from "@mui/material";
import Button from "@mui/material/Button";

function ViewWorkflow() {
  const navigate = useNavigate();
  const [getWorkflow, setWorkflow] = useState([]);

  useEffect(() => {
    fetch(`${API}/workflow/get`, {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        let final = result.find((user) => {
          return user.empName === localStorage.getItem("firstname");
        });
        // console.log(final.workflow);
        setWorkflow(final.workflow);
      });
  }, []);

  return (
    <div>
      <div className="container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={4}>Pending Workflows</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" className="fs-5">#</TableCell>
              <TableCell align="center" className="fs-5">Name</TableCell>
              <TableCell align="center" className="fs-5">Description</TableCell>
              <TableCell align="center" className="fs-5">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getWorkflow.map((workflow, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center" className="fs-5">{index + 1}</TableCell>
                  <TableCell align="center" className="fs-5">{workflow.name}</TableCell>
                  <TableCell align="center" className="fs-5">{workflow.description}</TableCell>
                  <TableCell align="center" className="fs-5">
                    <Button variant="contained">Approve</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <br />
        <Button
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}

export default ViewWorkflow;

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { API } from "../General/General";
import makeServiceCount from "./Dashboard";

function Service() {
  const navigate = useNavigate();
  const [services, setService] = useState([]);
  const [status, setStatus] = useState("created");
  const getServices = () => {
    fetch(`${API}/service`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setService(result);
        makeServiceCount(result.length);
      });
  };

  useEffect(() => getServices(), []);
  return (
    <div>
      {services ? (
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
                {services.map((user, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user.RequestName}</TableCell>
                      <TableCell>{user.Createdby}</TableCell>
                      <TableCell>{user.Status}</TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          onClick={() => {
                            setStatus("Completed");
                            const newStatus = { Status: status };
                            fetch(`${API}/service/${user._id}`, {
                              method: "PUT",
                              body: JSON.stringify(newStatus),
                              headers: {
                                "Content-type": "application/json",
                                "x-auth-token": localStorage.getItem("token"),
                              },
                            })
                              .then((response) => response.json())
                              .then(() => {
                                alert(`Approved Request no. ${user._id}`);
                                getServices();
                              });
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          color="error"
                          onClick={() => {
                            setStatus("Cancelled");
                            const newStatus = { Status: status };
                            fetch(`${API}/service/${user._id}`, {
                              method: "DELETE",
                              headers: {
                                "x-auth-token": localStorage.getItem("token"),
                              },
                            })
                              .then((response) => response.json())
                              .then(() => {
                                alert(`Deleted Request no. ${user._id}`);
                                getServices();
                              });
                          }}
                        >
                          Cancel
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <br />
          <span>Content Loading </span>
          <br />
          <CircularProgress thickness={4.5} size="5rem" />
        </div>
      )}
    </div>
  );
}

export default Service;

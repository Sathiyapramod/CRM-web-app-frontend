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

function Service() {
  const navigate = useNavigate();
  const [services, setService] = useState([]);
  const [status, setStatus] = useState("created");

  const getServices = () => {
    fetch(`${API}/service/`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setService(result);
      });
  };

  useEffect(() => getServices(), [services, status]);
  return (
    <div>
      {services ? (
        <Paper
          sx={{ width: 950 }}
          className="mx-auto mt-5 rounded-3 pb-3"
          elevation={6}
        >
          <TableContainer>
            <Table sx={{ minWidth: 300 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="fs-5 bg-light fw-bolder"
                    align="center"
                  >
                    Service Requests
                  </TableCell>
                </TableRow>
                <TableRow>
                  {[
                    "#",
                    "Request Name",
                    "Description",
                    "Date",
                    "See Workflow Action",
                  ].map((element, index) => {
                    return (
                      <TableCell
                        key={index}
                        align="center"
                        className="fw-bolder fs-5"
                      >
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
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{user.name}</TableCell>
                      <TableCell align="center">{user.description}</TableCell>
                      <TableCell align="center">
                        {user.date.slice(0, 10)}
                      </TableCell>
                      <TableCell align="center">
                        {localStorage.getItem("usertype") !== "employee" ? (
                          <Button
                            color="primary"
                            variant="contained"
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
                        ) : (
                          <Button color="primary" variant="contained" disabled>
                            Approve
                          </Button>
                        )}
                        {localStorage.getItem("usertype") !== "employee" && (
                          <Button
                            color="error"
                            onClick={() => {
                              setStatus("Cancelled");
                              const newStatus = { Status: status };
                              fetch(`${API}/service/${user._id}`, {
                                method: "POST",
                                body: JSON.stringify(newStatus),
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
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Button
            variant="contained"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </Button>
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

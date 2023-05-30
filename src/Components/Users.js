import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { API } from "../General/General";

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    fetch(`${API}/user/`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setUsers(result);
      });
  };
  // console.log(users);
  useEffect(() => getUsers(), []);
  return (
    <div>
      {users.length > 0 ? (
        <div className="text-uppercase container mx-auto shadow p-5">
          <TableContainer>
            <Table sx={{ minWidth: 300 }}>
              <TableHead>
                <TableRow>
                  {["#", "First Name", "Last Name", "Role", "Actions"].map(
                    (element, index) => {
                      return (
                        <TableCell key={index} align="center">
                          {element}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{user.firstname}</TableCell>
                      <TableCell align="center">{user.lastname}</TableCell>
                      <TableCell align="center">{user.usertype}</TableCell>
                      <TableCell align="center">
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => navigate(`/users/${user._id}`)}
                        >
                          View
                        </Button>
                        <Button
                          color="error"
                          variant="outlined"
                          onClick={() => {
                            fetch(`${API}/deleteuser/${user._id}`, {
                              method: "DELETE",
                            }).then(() => getUsers());
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider />
          <br />
          <Button variant="contained" onClick={() => navigate("/dashboard")}>
            Go Back
          </Button>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center mx-auto"
          style={{ height: "100vh" }}
        >
          <CircularProgress size="large" />
        </div>
      )}
    </div>
  );
}

export default Users;

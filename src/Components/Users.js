import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import CircularProgress from "@mui/material/CircularProgress";
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

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    fetch(`${API}/userlist`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
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
        <Paper sx={{ width: 950 }} className="mx-auto mt-5">
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
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user.Firstname}</TableCell>
                      <TableCell>{user.Lastname}</TableCell>
                      <TableCell>{user.Role}</TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          onClick={() => navigate(`/users/${user._id}`)}
                        >
                          View
                        </Button>
                        <Button
                          color="error"
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

export default Users;

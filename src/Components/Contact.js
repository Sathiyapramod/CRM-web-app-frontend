import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../General/General";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function Contact() {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${API}/contact/`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setContacts(result);
      });
  }, []);

  return (
    <div>
      <div className="card container">
        <div className="card-header fw-bold fs-3">Contacts</div>
        <div className="card-body">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="fw-bolder">
                    #
                  </TableCell>
                  <TableCell align="center" className="fw-bolder">
                    Name{" "}
                  </TableCell>
                  <TableCell align="center" className="fw-bolder">
                    Company
                  </TableCell>
                  <TableCell align="center" className="fw-bolder">
                    Phone
                  </TableCell>
                  <TableCell align="center" className="fw-bolder">
                    Email
                  </TableCell>
                  <TableCell align="center" className="fw-bolder">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{contact.name}</TableCell>
                      <TableCell align="center">{contact.company}</TableCell>
                      <TableCell align="center">{contact.phone}</TableCell>
                      <TableCell align="center">{contact.email}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained">View</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <br />
            <br />
            <Button
              variant="contained"
              onClick={() => {
                navigate(-1);
              }}
            >
              Go Back
            </Button>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Contact;

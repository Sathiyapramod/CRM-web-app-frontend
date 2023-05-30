import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { API } from "../General/General";
import { Box, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "@mui/material/Modal";

function Leads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const getLeads = () => {
    fetch(`${API}/lead/`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setLeads(result);
      });
  };

  useEffect(() => getLeads(), []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #132850",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="d-flex flex-row justify-content-center gap-5 flex-wrap">
      <CreateLead getLeads={getLeads} />
      {leads.length > 0 && (
        <Paper
          className="mt-5 rounded-3 pb-3 overflow-x-auto"
          elevation={6}
          sx={{ width: 850 }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="bg-light fw-bolder fs-4"
                    align="center"
                  >
                    List of Leads
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" className="fw-bold">
                    #
                  </TableCell>
                  <TableCell align="center" className="fw-bold">
                    Lead Name
                  </TableCell>
                  <TableCell align="center" className="fw-bold">
                    Company
                  </TableCell>
                  <TableCell align="center" className="fw-bold">
                    Phone
                  </TableCell>
                  <TableCell align="center" className="fw-bold">
                    E-mail
                  </TableCell>
                  <TableCell align="center" className="fw-bold">
                    Lead Source
                  </TableCell>
                  <TableCell align="center" className="fw-bold">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leads
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((leads, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{leads.leadname}</TableCell>
                        <TableCell align="center">{leads.company}</TableCell>
                        <TableCell align="center">{leads.phone}</TableCell>
                        <TableCell align="center">{leads.email}</TableCell>
                        <TableCell align="center">{leads.leadsource}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant="standard"
                            onClick={() => {
                              handleOpen();
                              setCurrentLead(leads);
                            }}
                          >
                            <MoreVertIcon />
                          </Button>
                          <Modal open={open} onClose={handleClose}>
                            <Box sx={modalStyle}>
                              <span className="d-flex flex-row justify-content-between align-items-center">
                                <TextField
                                  label="LeadName"
                                  defaultValue={currentLead.leadname}
                                  aria-readonly
                                />
                                <TextField
                                  label="Phone"
                                  defaultValue={currentLead.phone}
                                  aria-readonly
                                />
                              </span>
                              <br />
                              <span className="d-flex flex-row justify-content-between align-items-center">
                                <TextField
                                  label="Email"
                                  defaultValue={currentLead.email}
                                  aria-readonly
                                />
                                <TextField
                                  label="Lead Source"
                                  defaultValue={currentLead.leadsource}
                                  aria-readonly
                                />
                              </span>
                              <br />
                              <span className="d-flex flex-row justify-content-center align-items-center">
                                <TextField
                                  label="Company"
                                  defaultValue={currentLead.company}
                                  aria-readonly
                                />
                              </span>
                            </Box>
                          </Modal>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={leads.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <span className="pb-3">
            <Button variant="contained" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </span>
        </Paper>
      )}
    </div>
  );
}

function CreateLead({ getLeads }) {
  const [leadname, setLeadname] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [leadsource, setLeadsource] = useState("");

  const NewLead = () => {
    const newLeadDetails = {
      leadname,
      company,
      email,
      phone,
      leadsource,
    };

    fetch(`${API}/lead/lead`, {
      method: "POST",
      body: JSON.stringify(newLeadDetails),
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        getLeads();
      });
  };

  return (
    <div>
      <Paper
        className="mx-auto mt-5 rounded-3 pb-3"
        elevation={6}
        sx={{ width: "25vw" }}
      >
        <form>
          <span className="fs-4 d-flex justify-content-center align-items-center bg-light fw-bolder pt-2 pb-2">
            Create Lead
          </span>
          <br />
          <br />
          <div className="d-flex flex-column gap-2">
            <span className="col">
              <TextField
                type="text"
                variant="outlined"
                label="Lead Name"
                name="leadname"
                onChange={(event) => setLeadname(event.target.value)}
              />
            </span>
            <span>
              <TextField
                type="text"
                variant="outlined"
                label="Company"
                name="company"
                onChange={(event) => setCompany(event.target.value)}
              />
            </span>
            <span>
              <TextField
                type="text"
                variant="outlined"
                label="Phone"
                name="phone"
                onChange={(event) => setPhone(event.target.value)}
              />
            </span>
            <span>
              <TextField
                type="text"
                variant="outlined"
                label="Email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </span>
            <span className="col">
              <TextField
                type="text"
                variant="outlined"
                label="Lead Source"
                name="leadsource"
                onChange={(event) => setLeadsource(event.target.value)}
              />
            </span>
            <span>
              <input type="file" id="file" accept="image/png,image/jpeg" />
            </span>
          </div>
          <Button variant="contained" onClick={() => NewLead()}>
            Create
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Leads;

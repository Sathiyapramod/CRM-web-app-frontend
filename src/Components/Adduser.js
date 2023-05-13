import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { API } from "../General/General";

function Adduser() {
  const navigate = useNavigate();
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Role, setRole] = useState("");
  const [Extn, setExtn] = useState("");

  const [modalOpener, setModal] = useState(false);
  const handleClose = () => setModal(false);
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="register-form shadow p-3">
      <span className="fs-3">New User Registration</span>
      <form className="pt-5">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="col-4 mx-auto form-floating">
            <input
              id="Firstname"
              name="Firstname"
              className="form-control"
              onChange={(event) => setFirstname(event.target.value)}
            />
            <label htmlFor="Firstname">Firstname</label>
          </div>
          <div className="col-4 mx-auto form-floating">
            <input
              id="Lastname"
              className="form-control"
              name="Lastname"
              onChange={(event) => setLastname(event.target.value)}
            />
            <label htmlFor="Lastname" className="form-label">
              Lastname
            </label>
          </div>
        </div>
        <br />
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="col-4 mx-auto form-floating">
            <select
              className="form-select fs-6"
              defaultValue="None"
              onChange={(event) => {
                setRole(event.target.value);
              }}
              id="floatingLabel"
            >
              <option defaultValue="None">None</option>
              <option defaultValue="employee">employee</option>
              <option defaultValue="manager">manager</option>
              {localStorage.getItem("usertype") === "admin" ? (
                <option defaultValue="admin">admin</option>
              ) : (
                ""
              )}
            </select>
            <label htmlFor="Role" className="form-label fs-6">
              Role
            </label>
          </div>

          <div className="col-4 mx-auto form-floating">
            <input
              id="Extension"
              name="Extension"
              className="form-control"
              onChange={(event) => setExtn(event.target.value)}
            />
            <label htmlFor="Extension">Extension</label>
          </div>
        </div>
        <br />
        <Button
          color="secondary"
          variant="contained"
          value="Submit"
          onClick={() => {
            const newUser = {
              Firstname,
              Lastname,
              Role,
              Extn,
            };
            setModal(true);
            fetch(`${API}/adduser`, {
              method: "POST",
              body: JSON.stringify(newUser),
              headers: {
                "Content-type": "application/json",
                "x-auth-token": localStorage.getItem("token"),
              },
            })
              .then((response) => response.json())
              .then(() => {
                alert("User Added Successfully");
                navigate("/");
              });
          }}
        >
          CREATE
        </Button>
        <Modal
          open={modalOpener}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              User Created Successfully !!!
            </Typography>
          </Box>
        </Modal>
        <Button onClick={() => navigate(-1)} variant="contained">
          Go Back
        </Button>
      </form>
    </div>
  );
}

export default Adduser;

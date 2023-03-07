import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../General/General";
import Button from "@mui/material/Button";

function Viewuser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`${API}/userlist/${id}`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setUser(result);
      });
  }, [id]);
  //   console.log(user);
  return (
    <div>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <Paper sx={{ width: 350 }} className="mx-auto mt-5 p-3">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <span className="d-flex flex-row justify-content-center align-items-center gap-2">
              <label>First Name:</label>
              <label>{user.Firstname}</label>
            </span>
            <span className="d-flex flex-row justify-content-center align-items-center gap-2">
              <label>Last Name:</label>
              <label>{user.Lastname}</label>
            </span>
            <span className="d-flex flex-row justify-content-center align-items-center gap-2">
              <label>Employee Role:</label>
              <label>{user.Role}</label>
            </span>
            <span>
              <Button
                onClick={() => {
                  navigate("/users");
                }}
              >
                Go Back
              </Button>
            </span>
          </div>
        </Paper>
        <Edituser user={user} />
      </div>
    </div>
  );
  function Edituser({ user }) {
    const [Firstname, setFirstname] = useState(user.Firstname);
    const [Lastname, setLastname] = useState(user.Lastname);
    const [Role, setRole] = useState(user.Role);
    const [Extn, setExtn] = useState(user.Extn);
    // console.log(Firstname, Lastname, Role, Extn);
    return (
      <Paper sx={{ width: 450 }}>
        <div className="d-flex flex-column">
          <div className="d-flex flex-row align-items-center justify-content-center">
            <label className="col-5">First Name</label>
            <div className="col-6">
              <TextField
                value={Firstname}
                variant="outlined"
                onChange={(event) => setFirstname(event.target.value)}
              />
            </div>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <label className="col-5">Last Name</label>
            <div className="col-6">
              <TextField
                value={Lastname}
                variant="outlined"
                onChange={(event) => setLastname(event.target.value)}
              />
            </div>{" "}
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <label className="col-5">Role</label>
            <div className="col-6">
              <TextField
                value={Role}
                variant="outlined"
                onChange={(event) => setRole(event.target.value)}
              />
            </div>{" "}
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <label className="col-5">Extension</label>
            <div className="col-6">
              <TextField
                value={Extn}
                variant="outlined"
                onChange={(event) => setExtn(event.target.value)}
              />
            </div>
          </div>
          <span>
            <Button
              variant="contained"
              onClick={() => {
                const updatedUser = {
                  Firstname: Firstname,
                  Lastname: Lastname,
                  Role: Role,
                  Extn: Extn,
                };
                fetch(`${API}/edituser/${user._id}`, {
                  method: "PUT",
                  body: JSON.stringify(updatedUser),
                  headers: {
                    "Content-type": "application/json",
                    "x-auth-token":localStorage.getItem("token")
                  },
                })
                  .then((response) => {
                    response.json();
                  })
                  .then(() => {
                    alert("User Updated Successfully");
                    navigate("/users");
                  });
              }}
            >
              Update
            </Button>
          </span>
        </div>
      </Paper>
    );
  }
}

export default Viewuser;

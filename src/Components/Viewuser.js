import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../General/General";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Person3Icon from "@mui/icons-material/Person3";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

function Viewuser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});

  const getUserDetails = () => {
    fetch(`${API}/user/userlist/${id}`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setUser(result);
      });
  };

  useEffect(() => getUserDetails(), [id]);
  return (
    <div>
      <div className="d-flex flex-row justify-content-center align-items-center gap-3 mt-5">
        <Paper className="shadow d-flex flex-column justify-content-start align-items-start gap-3 p-3">
          <span>
            <Person3Icon /> <label>{user.firstname}</label>
          </span>
          <span>
            <PermIdentityIcon /> <label>{user.lastname}</label>
          </span>
          <span>
            <AssignmentIcon /> <label>{user.usertype}</label>
          </span>
          <span>
            <MarkEmailReadIcon /> <label>{user.email}</label>
          </span>
          <span>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/users");
              }}
            >
              Go Back
            </Button>
          </span>
        </Paper>
        <Edituser user={user} />
      </div>
    </div>
  );
  function Edituser({ user }) {
    console.log(user);
    const [Firstname, setFirstname] = useState(user.firstname);
    const [Lastname, setLastname] = useState(user.lastname);
    const [Role, setRole] = useState(user.usertype);
    const [Extn, setExtn] = useState(user.Extn);
    return (
      <Paper sx={{ width: 450, padding: 3 }}>
        <span className="fs-4">Edit User Details</span>
        <br />
        <br />
        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
          <div>
            <TextField
              variant="outlined"
              defaultValue={Firstname}
              onChange={(event) => setFirstname(event.target.value)}
            />
          </div>
          <div>
            <TextField
              value={Lastname}
              variant="outlined"
              onChange={(event) => setLastname(event.target.value)}
            />
          </div>{" "}
          <FormControl>
            <RadioGroup
              row
              name="user-role-selection-edit"
              defaultValue={Role}
              onChange={(event) => {
                setRole(event.target.value);
              }}
            >
              <FormControlLabel
                value="manager"
                control={<Radio />}
                label="manager"
              />
              <FormControlLabel
                value="employee"
                control={<Radio />}
                label="employee"
              />
              {localStorage.getItem("usertype") !== "admin" && (
                <FormControlLabel
                  disabled
                  value="admin"
                  control={<Radio />}
                  label="admin"
                />
              )}
            </RadioGroup>
          </FormControl>
          <div className="col-6"></div>{" "}
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
                    "x-auth-token": localStorage.getItem("token"),
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

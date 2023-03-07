import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, RadioGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { API } from "../General/General";

function Register() {
  const navigate = useNavigate();
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form>
        <Paper
          sx={{ width: 700, padding: 5 }}
          elevation={6}
          className="d-flex flex-column mx-auto gap-4 my-5"
        >
          <div className="fs-2">Login Details</div>
          <div className="d-flex flex-row justify-content-center align-items-center gap-3 mx-auto">
            <label className="form-label">Username</label>
            <div className="col-8">
              <input
                type="text"
                className="form-control me-2"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center gap-3 mx-auto">
            <label className="form-label">First Name</label>
            <div className="col-8">
              <input
                type="text"
                className="form-control me-2"
                onChange={(event) => setFirstname(event.target.value)}
              />
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center gap-3 mx-auto">
            <label className="form-label">Last Name</label>
            <div className="col-8">
              <input
                type="text"
                className="form-control me-2"
                onChange={(event) => setLastname(event.target.value)}
              />
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center gap-3 mx-auto">
            <label className="form-label">Email-Id</label>
            <div className="col-8">
              <input
                type="email"
                className="form-control me-2"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center gap-3 mx-auto">
            <label className="form-label">Role</label>
            <div className="col">
              <div>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="manager"
                    control={<Radio />}
                    label="Manager"
                    onChange={(event) => setRole(event.target.value)}
                  />
                  <FormControlLabel
                    value="employee"
                    control={<Radio />}
                    label="Employee"
                    onChange={(event) => setRole(event.target.value)}
                  />
                  <FormControlLabel
                    value="admin"
                    control={<Radio />}
                    label="Admin"
                    onChange={(event) => setRole(event.target.value)}
                  />
                </RadioGroup>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center gap-3 mx-auto">
            <label className="form-label">Password</label>
            <div className="col-8">
              <input
                type="password"
                className="form-control me-2"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
          <Button
            variant="contained"
            className="col-2 mx-auto"
            onClick={() => {
              const loginContent = {
                Firstname: Firstname,
                Lastname: Lastname,
                Role: Role,
                email: email,
                username: username,
                password: password,
              };
              // console.log(loginContent);
              fetch(`${API}/login`, {
                method: "POST",
                body: JSON.stringify(loginContent),
                headers: {
                  "Content-type": "application/json",
                },
              })
                .then((response) => {
                  response.json();
                })
                .then((result) => {
                  console.log(result);
                  alert("User Added Successfully");
                  navigate("/");
                });
            }}
            value="submit"
          >
            REGISTER
          </Button>
        </Paper>
      </form>
    </div>
  );
}

export default Register;

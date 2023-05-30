import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
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

  const Signup = () => {
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
        // console.log(result);
        alert("User Added Successfully");
        navigate("/");
      });
  };

  return (
    <div>
      <form>
        <Paper
          sx={{ width: 700, padding: 5 }}
          elevation={6}
          className="d-flex flex-column mx-auto gap-4 my-5"
        >
          <div className="fs-2">User Registration</div>
          <div className="col-5 mx-auto form-floating">
            <input
              type="text"
              className="form-control me-2"
              id="username"
              onChange={(event) => setUsername(event.target.value)}
            />
            <label className="form-label" htmlFor="username">
              Username
            </label>
          </div>
          <div className="col-5 mx-auto form-floating">
            <input
              type="text"
              className="form-control me-2"
              id="firstname"
              onChange={(event) => setFirstname(event.target.value)}
            />
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
          </div>
          <div className="col-5 mx-auto form-floating">
            <input
              type="text"
              className="form-control me-2"
              id="lastname"
              onChange={(event) => setLastname(event.target.value)}
            />
            <label className="form-label" htmlFor="lastname">
              Last Name
            </label>
          </div>
          <div className="col-5 mx-auto form-floating">
            <input
              type="email"
              id="email"
              className="form-control me-2"
              onChange={(event) => setEmail(event.target.value)}
            />
            <label className="form-label" htmlFor="email">
              Email-Id
            </label>
          </div>
          <div className="col-5 mx-auto form-floating">
            <select
              className="form-select"
              defaultValue="None"
              onChange={(event) => {
                setRole(event.target.value);
              }}
              id="userrole"
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
            <label className="form-label" htmlFor="userrole">
              Select Role
            </label>
          </div>
          <div className="col-5 mx-auto form-floating">
            <input
              type="password"
              id="password"
              className="form-control me-2"
              onChange={(event) => setPassword(event.target.value)}
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
          </div>
          <Button
            variant="contained"
            className="col-2 mx-auto"
            onClick={() => Signup()}
            value="submit"
          >
            REGISTER
          </Button>
          <Button
            variant="contained"
            className="col-2 mx-auto"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </Button>
        </Paper>
      </form>
    </div>
  );
}

export default Register;

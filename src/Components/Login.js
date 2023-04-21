import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { API } from "../General/General";

function Login() {
  const navigate = useNavigate();

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
                .then((response) => response.json())
                .then((result) => {
                  localStorage.setItem("token", result.token);
                  localStorage.setItem("usertype", result.usertype);
                  localStorage.setItem("firstname", result.firstname);
                  localStorage.setItem("lastname", result.lastname);
                  navigate("/dashboard");
                });
            }}
            value="submit"
          >
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/forgotpassword")}
            className="col-4 mx-auto"
          >
            Forgot Password ?
          </Button>
          <div>
            {" "}
            New to CRM, click here 👉🏼
            <Button
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Button>
          </div>
        </Paper>
      </form>
    </div>
  );
}

export default Login;

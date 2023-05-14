import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Login({ setUsername, setPassword, userLogin }) {
  const navigate = useNavigate();
  return (
    <div className="main-login">
      <form>
        <Paper
          sx={{ width: { xs: 350, sm: 550 }, padding: "1rem 0 1rem 0" }}
          elevation={6}
          className="d-flex flex-column gap-4 my-5 h-100 mx-auto"
        >
          <span className="fs-2">Login Details</span>
          <span>
            <TextField
              type="text"
              variant="standard"
              label="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </span>

          <span>
            <TextField
              type="password"
              variant="standard"
              label="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </span>
          <span className="d-flex flex-row justify-content-center align-items-center gap-3 py-2">
            <Button variant="contained" onClick={userLogin} value="submit">
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/forgotpassword")}
            >
              Forgot Password ?
            </Button>
          </span>
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

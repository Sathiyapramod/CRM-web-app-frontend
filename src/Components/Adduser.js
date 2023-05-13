import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { API } from "../General/General";

function Adduser() {
  const navigate = useNavigate();
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Role, setRole] = useState("");
  const [Extn, setExtn] = useState("");

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
        <Button onClick={() => navigate(-1)} variant="contained">
          Go Back
        </Button>
      </form>
    </div>
  );
}

export default Adduser;

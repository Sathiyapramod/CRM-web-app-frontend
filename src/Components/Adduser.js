import React, { useState } from "react";
import { TextField } from "@mui/material";
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
    <div>
      <form>
        <div className="d-flex flex-row gap-3 justify-content-center align-items-center ">
          <label htmlFor="Firstname">Firstname</label>
          <TextField
            id="Firstname"
            name="Firstname"
            onChange={(event) => setFirstname(event.target.value)}
          />
        </div>
        <div className="d-flex flex-row gap-3 justify-content-center align-items-center ">
          <label htmlFor="Lastname">Lastname</label>
          <TextField
            id="Lastname"
            name="Lastname"
            onChange={(event) => setLastname(event.target.value)}
          />
        </div>
        <div className="d-flex flex-row gap-3 justify-content-center align-items-center ">
          <label htmlFor="Role">Role</label>
          <RadioGroup defaultValue="Manager" row>
            <FormControlLabel
              value="Manager"
              control={<Radio />}
              label="Manager"
              onChange={(event) => setRole(event.target.value)}
            />
            <FormControlLabel
              value="Employee"
              control={<Radio />}
              label="Employee"
              onChange={(event) => setRole(event.target.value)}
            />
            <FormControlLabel
              value="Admin"
              control={<Radio />}
              label="Admin"
              onChange={(event) => setRole(event.target.value)}
            />
          </RadioGroup>
        </div>
        <div className="d-flex flex-row gap-3 justify-content-center align-items-center ">
          <label htmlFor="Extn">Extension</label>
          <TextField
            id="Extension"
            name="Extension"
            onChange={(event) => setExtn(event.target.value)}
          />
        </div>
        <Button
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
                "x-auth-token":localStorage.getItem("token")
              },
            })
              .then((response) => response.json())
              .then(() => {
                alert("User Added Successfully");
                navigate("/")
              });
          }}
        >
          CREATE
        </Button>
      </form>
    </div>
  );
}

export default Adduser;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../General/General";
import { Button } from "@mui/material";

function Updatepassword() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [random, setRn] = useState("");
  return (
    <div>
      <div className="d-flex flex-column gap-3 justify-content-center align-items-center mx-auto">
        <label>Enter you password</label>
        <div className="col-2">
          <input
            type="password"
            onChange={(event) => setRn(event.target.value)}
          />
        </div>
        <div>
          <Button
            onClick={() => {
              const data = {
                rn: random,
              };
              fetch(`${API}/updatepassword/${id}`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                  "content-type": "application/json",
                },
              })
                .then((response) => {
                  if (response.status !== 200) console.log("error");
                  else response.json();
                })
                .then(() => {
                  alert("password reset successfully");
                  navigate("/");
                });
            }}
          >
            SEND
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Updatepassword;

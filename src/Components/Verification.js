import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../General/General";

function Verification() {
  const navigate = useNavigate();
  const [rn, setRandom] = useState("");
  return (
    <div>
      <label>Enter ONE-TIME PASSWORD</label>
      <div className="col-5">
        <input
          type="text"
          className="form-control me-2"
          onChange={(event) => setRandom(event.target.value)}
        />
      </div>
      <div>
        <Button
          onClick={() => {
            const data = {
              random: rn,
            };
            fetch(`${API}/verification`, {
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
              .then((result) => {
                alert("One-time-Password matched !!!");
                navigate(`/updatepassword`);
              });
          }}
        >
          Verify
        </Button>
      </div>
    </div>
  );
}

export default Verification;

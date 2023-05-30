import React, { useState } from "react";
import { Button } from "@mui/material";
import { API } from "../General/General";
import { useNavigate } from "react-router-dom";

function Forgotpassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  return (
    <div>
      <div className="fs-2">Forgot Password !!</div>
      <div className="d-flex flex-column justify-content-center align-items-center gap-2 mx-auto">
        <div>
          <label>Enter Email address</label>
          <div className="col-12">
            <input
              type="email"
              className="form-control me-2"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                const data = {
                  email: email,
                };
                fetch(`${API}/forgotpassword`, {
                  method: "POST",
                  body: JSON.stringify(data),
                  headers: {
                    "content-type": "application/json",
                  },
                })
                  .then((response) => response.json())
                  .then((result) => {
                    // console.log(result);
                    navigate(`/verification`);
                  });
              }}
            >
              Get OTP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgotpassword;

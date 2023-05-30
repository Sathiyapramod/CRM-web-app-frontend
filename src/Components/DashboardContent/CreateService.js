import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { API } from "../../General/General";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";

function CreateService() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [approver, setApprover] = useState("");
  const [usersinWorkflow, setUsersinWorkflow] = useState([]);
  const [flag, setFlag] = useState(false);

  const getWorkflow = () => {
    fetch(`${API}/workflow/get/`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setUsersinWorkflow(
          result.filter((users) => {
            return users.empName !== localStorage.getItem("firstname");
          })
        );
      });
  };

  const sendRequest = () => {
    const newServiceRequest = {
      isCreated: 0,
      isReleased: 0,
      isCompleted: 0,
      isOpen: 0,
      name,
      description,
      date,
    };

    // console.log(newServiceRequest);

    fetch(`${API}/service/`, {
      method: "POST",
      body: JSON.stringify(newServiceRequest),
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
      });

    fetch(`${API}/workflow/get/${approver}`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        let receiverID = result._id;
        // console.log(result);
        fetch(`${API}/workflow/addition/${receiverID}`, {
          method: "PUT",
          body: JSON.stringify(newServiceRequest),
          headers: {
            "Content-type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
            usertype: localStorage.getItem("usertype"),
          },
        })
          .then((response) => response.json())
          .then((result) => {
            // console.log(result);
            setFlag(true);
            setTimeout(() => {
              navigate("/dashboard");
            }, 3000);
          });
      });
  };

  useEffect(() => {
    getWorkflow();
  }, []);
  return (
    <div
      className="container-fluid mx-auto d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card rounded-4 shadow" style={{ width: "45rem" }}>
        <div className="card-header fs-4 fw-bolder bg-lights">
          Create Service Request
        </div>
        <div className="card-body">
          <div className="d-flex flex-row justify-content-between align-items-center container-fluid">
            <span>
              <TextField
                label="Name"
                name="Name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </span>
            <span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  defaultValue={dayjs("2023-04-17")}
                  onChange={(newDate) => {
                    setDate(newDate.$d);
                    console.log(newDate.$d);
                  }}
                  label="Select Date"
                />
              </LocalizationProvider>
            </span>
          </div>
          <br />
          <span className="mx-auto container-fluid">
            <TextField
              label="Description"
              multiline
              rows={4}
              color="secondary"
              sx={{ width: "75%" }}
              onChange={(event) => setDescription(event.target.value)}
            />
          </span>
          <br />
          <br />
          <span className="d-flex flex-row justify-content-between align-items-center container">
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="approver-label">Select Approver</InputLabel>
              <Select
                labelId="approver-label"
                id="approver-select"
                label="Age *"
                value={approver}
                onChange={(event) => {
                  setApprover(event.target.value);
                }}
              >
                {usersinWorkflow.map((users, index) => {
                  return (
                    <MenuItem key={index} value={users._id}>
                      {users.empName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={sendRequest}>
              Send
            </Button>
            {flag && (
              <Snackbar
                open={flag}
                autoHideDuration={3000}
                onClose={(event, reason) => {
                  if (reason === "clickaway") return;
                  setFlag(false);
                }}
              >
                <Alert
                  severity="success"
                  variant="filled"
                  onClose={(event, reason) => {
                    if (reason === "clickaway") return;
                    setFlag(false);
                  }}
                >
                  Service Request Sent Succesfully !
                </Alert>
              </Snackbar>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreateService;

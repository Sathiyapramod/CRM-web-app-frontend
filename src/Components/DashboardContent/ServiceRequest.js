import React, { useState, useEffect } from "react";
import { API } from "../../General/General";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";

function ServiceRequest() {
  const [Created, setCreated] = useState(0);
  const [released, setReleased] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [open, setOpen] = useState(0);
  const [workflowCount, setWorkflowCount] = useState(0);

  const getServiceRequests = () => {
    fetch(`${API}/service`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
      });
  };

  const linkStyle = {
    color: "auto",
    textDecoration: "none",
  };

  const getWorkflowrequests = () => {
    fetch(`${API}/workflow/get/`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        let finalCount = result.find((user) => {
          return user.empName === localStorage.getItem("firstname");
        });
        // console.log(finalCount.workflow.length);
        let final = finalCount.workflow;
        setWorkflowCount(final.length);
      });
  };
  useEffect(() => {
    getServiceRequests();
    getWorkflowrequests();
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header fw-bold fs-3">Service Requests</div>
        <div className="card-body">
          <div className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-5">
            {[
              {
                name: "Created",
                count: Created,
                color: "#EF7C8E",
              },
              {
                name: "Released",
                count: released,
                color: "#FAE8E0",
              },
              {
                name: "Completed",
                count: completed,
                color: "#B6E2D3",
              },
              {
                name: "Open",
                count: open,
                color: "#D8A7B1",
              },
            ].map((request, index) => {
              return (
                <Paper
                  sx={{
                    width: 100,
                    height: 75,
                    backgroundColor: request.color,
                  }}
                  className="pt-1"
                  elevation={6}
                  key={index}
                >
                  <span className="pt-5">{request.name}</span>
                </Paper>
              );
            })}
            <Link
              to="/service"
              className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            >
              See More...
            </Link>
          </div>
          <br />
          <Link to="/workflow" style={linkStyle}>
            <div className="rounded-3 shadow text-white d-flex justify-content-center align-items-center flex-wrap p-3">
              <span
                className="rounded-3 p-3"
                style={{
                  width: "10rem",
                  height: "10rem",
                  backgroundColor: "#132850",
                }}
              >
                PENDING REQUESTS
                <br />
                <span className="fw-bolder fs-1">{workflowCount}</span>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ServiceRequest;

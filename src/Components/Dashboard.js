import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { API } from "../General/General";
import Usertable from "./DashboardContent/Usertable";
import ServiceRequest from "./DashboardContent/ServiceRequest";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ContactsIcon from "@mui/icons-material/Contacts";
import DashboardCustomizeSharpIcon from "@mui/icons-material/DashboardCustomizeSharp";

function Dashboard() {
  const [usercount, setusercount] = useState(0);
  const [leadcount, setleadcount] = useState(0);
  const [servicecount, setservicecount] = useState(0);
  const [contactcount, setcontactcount] = useState(0);

  useEffect(() => {
    fetch(`${API}/user`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setusercount(result.length);
        // console.log(result);
      });
    fetch(`${API}/lead/`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((lead) => setleadcount(lead.length));
    fetch(`${API}/service/`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((service) => setservicecount(service.length));
    fetch(`${API}/contact`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((contact) => setcontactcount(contact.length));
  }, [usercount, leadcount, servicecount, contactcount]);

  return (
    <div>
      <span className="mx-auto">
        <span className="fs-2">Welcome</span>
        <br />
        <span className="fs-5 text-tertiary-emphasis">
          {localStorage.getItem("firstname").toUpperCase()}{" "}
          {localStorage.getItem("lastname").toUpperCase()}
        </span>
      </span>
      <div className="row">
        <div
          className="col text-end position-absolute"
          style={{ inset: "5.5rem 0 0 -1rem" }}
        >
          <Link to="/createservice">
            <Button variant="contained" sx={{ backgroundColor: "#132850" }}>
              {localStorage.getItem("usertype") === "employee"
                ? "+ Create Service Req."
                : "View Requests"}
            </Button>
          </Link>
        </div>
      </div>
      <div className="container d-flex flex-row flex-wrap justify-content-sm-center justify-content-center justify-content-lg-between align-items-center py-4 gap-4">
        {[
          {
            name: "Users",
            count: usercount,
            data: { link: "/users", button: "GET Users" },
            color: "#EF7C8E",
          },
          {
            name: "Leads",
            count: leadcount,
            data: { link: "/leads", button: "GET Leads" },
            color: "#FAE8E0",
          },
          {
            name: "Service Requests",
            count: servicecount,
            data: { link: "/service", button: "GET Requests" },
            color: "#B6E2D3",
          },
          {
            name: "Contacts",
            count: contactcount,
            data: { link: "/contact", button: "GET Contacts" },
            color: "#D8A7B1",
          },
        ].map((element, index) => {
          return (
            <Paper
              sx={{
                width: { xs: 250, sm: 350 },
                height: 150,
                backgroundColor: element.color,
              }}
              elevation={6}
              key={index}
            >
              <span className="fs-3 justify-content-center position-relative">
                {element.name == "Users" && (
                  <PersonSearchIcon fontSize="large" />
                )}
                {element.name == "Leads" && (
                  <SupportAgentIcon fontSize="large" />
                )}
                {element.name == "Contacts" && (
                  <ContactsIcon fontSize="large" />
                )}
                {element.name == "Service Requests" && (
                  <DashboardCustomizeSharpIcon
                    fontSize="large"
                    className="top-0 bottom-0"
                  />
                )}
                {element.name}
              </span>
              <div className="fs-2">{element.count}</div>
              <span>
                <Link to={element.data.link}>
                  <Button variant="contained">{element.data.button}</Button>
                </Link>
              </span>
            </Paper>
          );
        })}
      </div>
      <div className="d-flex flex-row justify-content-center align-items-start gap-lg-5 p-1 flex-wrap gap-sm-2 flex-lg-nowrap">
        <Usertable />
        <ServiceRequest />
      </div>
    </div>
  );
}

export default Dashboard;

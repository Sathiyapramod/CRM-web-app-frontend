import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { API } from "../General/General";

function Dashboard() {
  const [usercount, setusercount] = useState(0);
  const [leadcount, setleadcount] = useState(0);
  const [servicecount, setservicecount] = useState(0);
  const [contactcount, setcontactcount] = useState(0);

  useEffect(() => {
    fetch(`${API}/userlist`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      }
    })
      .then((response) => response.json())
      .then((result) => setusercount(result.length));
    fetch(`${API}/lead`,{
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      }
    })
      .then((response) => response.json())
      .then((lead) => setleadcount(lead.length));
    fetch(`${API}/service`,{
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      }
    })
      .then((response) => response.json())
      .then((service) => setservicecount(service.length));
    fetch(`${API}/contact`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      }
    })
      .then((response) => response.json())
      .then((contact) => setcontactcount(contact.length));
  }, [usercount, leadcount, servicecount, contactcount]);

  return (
    <div>
      <div className="d-flex flex-row justify-content-center align-items-center py-4 gap-4">
        {[
          {
            name: "Users",
            count: usercount,
            data: { link: "/users", button: "GET Users" },
          },
          {
            name: "Leads",
            count: leadcount,
            data: { link: "/leads", button: "GET Leads" },
          },
          {
            name: "Service Requests",
            count: servicecount,
            data: { link: "/service", button: "GET Requests" },
          },
          {
            name: "Contacts",
            count: contactcount,
            data: { link: "/contact", button: "GET Contacts" },
          },
        ].map((element, index) => {
          return (
            <Paper sx={{ width: 250, height: 150 }} elevation={6} key={index}>
              <div className="fs-2">{element.name}</div>
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
    </div>
  );
}

export default Dashboard;

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Paper } from "@mui/material";
import { API } from "../General/General";
import { DataGrid } from "@mui/x-data-grid";

function Service() {
  const navigate = useNavigate();
  const [services, setService] = useState([]);
  const [status, setStatus] = useState("created");

  const columns = [
    {
      field: "_id",
      headerName: "Sl.no.",
      width: 70,
    },
    {
      field: "date",
      headerName: "date",
      width: 180,
    },
    {
      field: "name",
      headerName: "name",
      width: 180,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
  ];

  const getServices = () => {
    fetch(`${API}/service/`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setService(result);
        console.log(result);
      });
  };

  useEffect(() => getServices(), [services, status]);
  return (
    <div>
      {services ? (
        <Paper
          sx={{ width: 950 }}
          className="mx-auto mt-5 rounded-3 pb-3"
          elevation={6}
        >
          <DataGrid
            rows={services}
            
            getRowId={(row) => row._id}
            columns={columns}
            className="fw-bold fs-5"
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          ></DataGrid>
          <br />
          <Button
            variant="contained"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </Button>
        </Paper>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <br />
          <span>Content Loading </span>
          <br />
          <CircularProgress thickness={4.5} size="5rem" />
        </div>
      )}
    </div>
  );
}

export default Service;

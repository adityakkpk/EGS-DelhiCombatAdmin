import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./History.css";

export default function History({ id }) {
  useEffect(() => {
    console.log(id);
    fetchData();
  }, []);
  const [history, setHistory] = useState({});
  const fetchData = () => {
    axios
      .post("http://localhost:8081/history/" + id)
      .then((resp) => {
        setHistory(resp.data);
      })
      .catch((err) => console.log(err));
  };
  const columns = [
    {
      field: "memberShipID",
      headerName: "MemberShip Id",
      width: 130,
      renderCell: (cellValue) => {
        return <p style={{ textAlign: "center" }}>DC00{cellValue.value}</p>;
      },
    },
    {
      field: "packageType",
      headerName: "MemberShip Type",
      width: 140,
      renderCell: (cellValue) => {
        return <p style={{ textAlign: "center" }}>{cellValue.value}</p>;
      },
    },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 130,
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 100,
    },
  ];
  return (
    <div className="parent-history">
      <div className="card2">
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "white",
              color: "black",
              fontWeight: 700,
            },
            "& .MuiDataGrid-cell": {
              backgroundColor: "white",
              color: "black",
            },
          }}
          hideFooter={true}
          columns={columns}
          rows={history}
        />{" "}
      </div>
    </div>
  );
}

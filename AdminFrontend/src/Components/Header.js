import React, { useState } from "react";
import "./Header.css";
import Logo from "./Logo.jpg";
import SearchIcon from "@mui/icons-material/Search";
import NewPackage from "./NewPackage";
import NewClient from "./NewClient";
import DashBoard from "./DashBoard";
import "./Packages.css";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Delete } from "@mui/icons-material";
export default function Header() {
  const [packages, setPackages] = useState();
  const [upcomingRenewalClicked, setUpcomingRenewalClicked] = useState(false);
  const [upcomingRenewalUser, setUpcomingRenewalUser] = useState();
  const upcomingRenewal = () => {
    setUpcomingRenewalClicked(!upcomingRenewalClicked);
    axios
      .get("https://egs-delhicombatadmin.onrender.com/api/upcomingRenewalUser")
      .then((res) => {
        setUpcomingRenewalUser(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteClickPackage = (id) => {
    if (window.confirm("Are you sure want to delete")) {
      setPackages(packages.filter((row) => row.id !== id));
      try {
        axios
          .delete("https://egs-delhicombatadmin.onrender.com/api/deletePackage/" + id)
          .then((res) => {
            alert("Successfully Deleted");
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  };
  const [searchData, setSearchData] = useState(null);
  const handleSearchSubmit = () => {
    window.location.reload();
  };
  const [newPackageClicked, setNewPackageClicked] = useState(false);
  const newPackageCli = () => {
    setNewPackageClicked(!newPackageClicked);
  };
  const [newClientClicked, setNewClientClicked] = useState(false);
  const newClientCli = () => {
    setNewClientClicked(!newClientClicked);
  };
  const [viewPackage, setViewPackage] = useState(false);
  const viewPackageCl = () => {
    setViewPackage(!viewPackage);
    axios
      .get("https://egs-delhicombatadmin.onrender.com/api/packages")
      .then((res) => {
        setPackages(res.data);
      })
      .catch((err) => console.log(err));
  };
  const columns2 = [
    {
      field: "id",
      headerName: "Gym Id.",
      width: 70,
      renderCell: (cellValue) => {
        return <p>DC00{cellValue.value}</p>;
      },
    },
    {
      field: "firstName",
      headerName: "Name",
      width: 100,
    },
    {
      field: "packageType",
      headerName: "Package Type",
      width: 120,
    },
    {
      field: "subscipSta",
      headerName: "Start Date",
      width: 100,
    },
    {
      field: "leftDays",
      headerName: "Left Days",
      width: 80,
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "S. No.",
      width: 70,
    },
    {
      field: "type",
      headerName: "Package Type",
      width: 120,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 100,
    },
    {
      field: "price",
      headerName: "Price",
      width: 80,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Delete",
      width: 80,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={() => handleDeleteClickPackage(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const row = [
    {
      id: 1,
      type: "Bronze",
      duration: "1 Months",
      price: 3500,
    },
    {
      id: 2,
      type: "Silver",
      duration: "3 Months",
      price: 8000,
    },
    {
      id: 3,
      type: "Gold",
      duration: "6 Months",
      price: 12000,
    },
    {
      id: 4,
      type: "Platinum",
      duration: "12 Months",
      price: 20000,
    },
  ];
  return (
    <div>
      <div className="header">
        <div className="logo">
          <img src={Logo} alt="DC" onClick={() => setNewClientClicked(false)} />
        </div>
        <div className="wel">
          <h1>Welcome to DashBoard</h1>
        </div>
        <div className="add-Op">
          <div className="btn">
            <button onClick={newClientCli}>Add Client</button>
          </div>
          <div className="btn">
            <button onClick={newPackageCli}> New Package</button>
          </div>
          <div className="btn">
            <button onClick={() => viewPackageCl()}> View Package</button>
          </div>
          <div className="btn">
            <button onClick={() => upcomingRenewal()}> Upcoming Renewal</button>
          </div>
          <div className="input-Field">
            <input
              type="text"
              placeholder="Enter Name"
              id="search-bar"
              onChange={(val) => setSearchData(val.target.value)}
            />
            <SearchIcon onClick={() => handleSearchSubmit()} />
          </div>
        </div>
      </div>
      {viewPackage ? (
        <div className="superParent">
          <div className="parent-packages">
            <div className="close">
              <div onClick={() => setViewPackage(false)}>
                <CloseIcon />
              </div>
            </div>
            <div className="box-packages">
              <DataGrid rows={packages ? packages : row} columns={columns} />
            </div>
          </div>
        </div>
      ) : (
        " "
      )}
      {upcomingRenewalClicked ? (
        <div className="superParent">
          <div className="parent-packages">
            <div className="close">
              <div onClick={() => setUpcomingRenewalClicked(false)}>
                <CloseIcon />
              </div>
            </div>
            <div className="box-packages">
              <DataGrid
                rows={upcomingRenewalUser ? upcomingRenewalUser : row}
                columns={columns2}
              />
            </div>
          </div>
        </div>
      ) : (
        " "
      )}
      {newPackageClicked ? <NewPackage /> : " "}
      {newClientClicked ? (
        <NewClient />
      ) : (
        <DashBoard searchedData={searchData} />
      )}
    </div>
  );
}

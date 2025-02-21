import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from "@mui/x-data-grid";
import "./DashBoard.css";
import { Button } from "@mui/material";
import { randomId } from "@mui/x-data-grid-generator";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import RenewMemberShip from "./RenewMemberShip";
import axios from "axios";
import History from "./History";
import Close from "@mui/icons-material/Close";

export default function DashBoard({ searchedData }) {
  const [remarks, setRemarks] = useState({});
  const [memberID, setMemberId] = useState(0);

  const [viewHistory, setViewHistory] = useState(false);
  let currDate;
  useEffect(() => {
    currDate = new Date();
    fetchUser();
  }, [searchedData]);
  const handleViewHistory = (id) => {
    setViewHistory(!viewHistory);
    setMemberId(id);
  };
  const [searchData, setSearchData] = useState();
  const fetchSearchedData = () => {
    axios
      .get("http://localhost:8081/searchData/" + searchedData)
      .then((resp) => {
        setSearchData(resp.data);
        console.log(resp.data);
      })
      .catch((err) => console.log(err));
  };
  // const updateRemainingDays = () => {
  //   axios
  //     .put("http://localhost:8081/updateRemainingDays")
  //     .then((resp) => {
  //       console.log("Remaing Days Updated");
  //     })
  //     .catch((err) => console.log(err));
  // };
  const [user, setUser] = useState();
  const fetchUser = async () => {
    fetchSearchedData();
    // updateRemainingDays();
    axios
      .get("http://localhost:8081/dashboard")
      .then((resp) => {
        setUser(resp.data);
      })
      .catch((err) => console.log(err));
  };
  const [renewPackage, setRenewPackage] = useState(false);
  const renewButtonClicked = (id) => {
    setRenewPackage(!renewPackage);
    setMemberId(id);
  };
  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [
        ...oldRows,
        { id, name: "", age: "", isNew: true },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      }));
    };
  }
  const rowsData = [
    {
      id: 1,
      firstName: "Lakshay",
      lastName: "Goel",
      address: "3718, Sector 23",
      mobile: 7212424121,
      email: "lakshaygoel111@gmail",
      packageType: "1 year",
      amount: 2100,
      transacDate: "19/10/2023",
      transacNum: "124614",
      subscripSta: "21/10/2023",
      subscripEnd: "21/10/2024",
      subscripHist: "21-29 October 2024",
      leftDays: "210",
      memberType: "PT",
      batchTime: "10:00-12:00",
    },
  ];
  const [rowModesModel, setRowModesModel] = useState({});
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    if (window.confirm("Are you sure want to delete")) {
      setUser(user.filter((row) => row.id !== id));
      try {
        axios
          .delete("http://localhost:8081/delete/" + id)
          .then((res) => {
            alert("Successfully Deleted");
            // window.location.reload();
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = user.find((row) => row.id === id);
    if (editedRow.isNew) {
      setUser(user.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setUser(user.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      renderCell: (cellValue) => {
        return (
          <div>
            <p>DC00{cellValue.value}</p>
          </div>
        );
      },
    },

    {
      field: "firstName",
      headerName: "First name",
      width: 100,
      editable: true,
    },
    { field: "lastName", headerName: "Last name", width: 100, editable: true },
    { field: "address", headerName: "Address", width: 170, editable: true },
    { field: "mobile", headerName: "Mobile No.", width: 120, editable: true },
    { field: "email", headerName: "Email ID.", width: 170, editable: true },
    {
      field: "packageType",
      headerName: "Package Type",
      width: 120,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Paid Amount",
      type: "number",
      align: "left",
      headerAlign: "left",
      width: 120,
      editable: true,
    },
    {
      field: "transacDate",
      headerName: "Transaction Date",
      width: 150,
      editable: true,
    },
    {
      field: "transacNum",
      headerName: "Transaction Number",
      width: 150,
      editable: true,
    },
    {
      field: "subscipSta",
      headerName: "Subscription Start",
      width: 150,
      editable: true,
    },
    {
      field: "subscripEnd",
      headerName: "Subscription End",
      width: 150,
      editable: true,
    },
    {
      field: "subscripHist",
      headerName: "Subscription History",
      width: 150,
      editable: true,
      renderCell: (cellValue) => {
        return (
          <Button onClick={() => handleViewHistory(cellValue.id)}>
            View History
          </Button>
        );
      },
    },


    {
      field: "leftDays",
      headerName: "Renewal Days Left",
      width: 150,
      editable: true,
      renderCell: (cellValue) => {
        const date2 = new Date(cellValue.row.subscipSta);
        currDate = new Date();
        console.log(Math.floor((currDate - date2) / (3600000 * 24)));
        console.log(cellValue.value);
        return (
          <p>
            {cellValue.value - 1 - Math.floor((currDate - date2) / (3600000 * 24))}
          </p>
        );
      },
    },
    {
      field: "memberType",
      headerName: "Membership Type",
      width: 140,
      editable: true,
    },
    {
      field: "batchTime",
      headerName: "Batch Time",
      width: 100,
      editable: true,
    },
    {
      field: "Renew MemberShip",
      renderCell: (cellValue) => {
        return (
          <Button onClick={() => renewButtonClicked(cellValue.id)}>
            Renew
          </Button>
        );
      },
      width: 140,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      renderCell: (cellValue) => {
        return (
          <textarea
            style={{ height: "40px", width: "110px" }}
            onChange={(val) => setRemarks(val.target.value)}
            defaultValue={cellValue.value}
          />
        );
      },
      width: 120,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "More Actions",
      width: 120,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isEditMode) {
          return [
            <GridActionsCellItem
              icon={<Save />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  return (
    <div>
      {renewPackage ? (
        <>
          <div className="close-renew">
            <div>
              <Close onClick={() => setRenewPackage(false)} />
            </div>

            <RenewMemberShip id={memberID} />
          </div>
        </>
      ) : (
        " "
      )}
      {viewHistory ? (
        <>
          <div className="close-history">
            <Close onClick={() => setViewHistory(false)} />

            <History id={memberID} />
          </div>
        </>
      ) : (
        " "
      )}
      <div className={renewPackage ? "low-opacity dashBoard" : "dashBoard"}>
        <div style={{ height: 800, width: "100%" }}>
          <DataGrid
            sx={{
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "black",
                color: "white",
                fontWeight: 700,
              },
              "& .MuiDataGrid-cell": {
                backgroundColor: "black",
                color: "wheat",
              },
            }}
            rows={searchedData === null ? (user ? user : rowsData) : searchData}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setUser, setRowModesModel },
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 15 },
              },
            }}
            pageSizeOptions={[15, 20, 25]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}

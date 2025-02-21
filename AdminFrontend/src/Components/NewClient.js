import React, { useEffect, useState } from "react";
import "./NewClient.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

export default function NewClient({ setNewClientClicked }) {
  const [memeberShipType, setMemberType] = useState({});
  const handleChange = (event) => {
    setMemberType(event.target.value);
  };

  const [packageType, setPackageType] = useState({});
  const handleChange2 = (event) => {
    setPackageType(event.target.value);
  };
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [transacDate, setTransacDate] = useState();
  const [transacNum, setTransacNum] = useState();
  const [subscripSta, setSubscripSta] = useState();
  const [subscripHist, setSubscripHist] = useState("No History");
  const [batchTime, setBatchTime] = useState("");
  const [remarks, setRemarks] = useState("");
  useEffect(() => {
    getPackageType();
  }, []);
  const [packages, setPackages] = useState();
  const getPackageType = () => {
    Axios.get("https://egs-delhicombatadmin.onrender.com/api/getPackage")
      .then((res) => {
        setPackages(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const renewMemberShip = () => {
    Axios.post(
      "https://egs-delhicombatadmin.onrender.com/api/renewMemberShip",
      {
        fName,
        mobile,
        packageType,
        memeberShipType,
        subscripSta,
      }
    )
      .then((res) => {
        console.log("Success");
      })
      .catch((err) => console.log(err));
  };
  const handleSubmitNew = () => {
    setLoading(true);
    Axios.post("https://egs-delhicombatadmin.onrender.com/api/newClient", {
      fName,
      lName,
      address,
      mobile,
      email,
      amount,
      transacDate,
      transacNum,
      subscripSta,
      subscripHist,
      batchTime,
      memeberShipType,
      remarks,
      packageType,
    })
      .then((res) => {
        renewMemberShip();
        if (res.data === "Success") {
          setLoading(false);
          navigate("/dashboard");
        } else {
          setLoading(false);
          alert("No record found  ");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className="parent">
      <div className="card">
        <a className="close" onClick={() => setNewClientClicked(false)}>
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="CloseIcon"
          >
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </a>
        <div>
          <p>
            Enter First Name
            <input
              type="text"
              id="fName"
              className="inputFields"
              onChange={(e) => setFName(e.target.value)}
            />
          </p>
        </div>

        <div>
          <p>
            Enter Last Name
            <input
              type="text"
              id="LName"
              className="inputFields"
              onChange={(e) => setLName(e.target.value)}
            />
          </p>
        </div>
        <div>
          <p>
            Enter Address
            <input
              type="text"
              id="address"
              className="inputFields"
              onChange={(e) => setAddress(e.target.value)}
            />
          </p>
        </div>
        <div>
          <p>
            Enter Mobile
            <input
              type="number"
              id="mobile"
              className="inputFields"
              onChange={(e) => setMobile(Number(e.target.value))}
            />
          </p>
        </div>
        <div>
          <p>
            Enter Email
            <input
              type="email"
              id="email"
              className="inputFields"
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>
        </div>
        <div className="memberTypeParent">
          <p className="memberTP">
            Enter the membership type
            <FormControl className="memberType">
              <Select
                labelId="demo-simple-select-label"
                id=""
                value={memeberShipType}
                label="Member Ship Type"
                onChange={handleChange}
              >
                <MenuItem value={"GS"}>Group Session</MenuItem>
                <MenuItem value={"PT"}>Personal Training</MenuItem>
              </Select>
            </FormControl>
          </p>
        </div>
        <div className="memberTypeParent">
          <p>
            Enter Package Type
            <FormControl className="memberType">
              <Select
                labelId="demo-simple-select-label"
                id=""
                value={packageType}
                label="Member Ship Type"
                onChange={handleChange2}
              >
                {packages?.map((data) => {
                  return (
                    <MenuItem key={data.id} value={data.duration}>
                      {data.duration}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>{" "}
          </p>
        </div>
        <div>
          <p>
            Enter Amount Paid
            <input
              type="number"
              id="paidAmount"
              className="inputFields"
              onChange={(e) => setAmount(e.target.value)}
            />
          </p>
        </div>
        <div>
          <p>
            Enter Transaction Date
            <input
              type="date"
              id="transactD"
              className="inputFields"
              onChange={(e) => setTransacDate(e.target.value)}
            />
          </p>
        </div>
        <div>
          <p>
            Enter Transaction Number
            <input
              type="number"
              id="transacN"
              className="inputFields"
              onChange={(e) => setTransacNum(e.target.value)}
            />
          </p>
        </div>
        <div>
          <p>
            Enter Subscription Start Date
            <input
              type="date"
              id="subsripS"
              className="inputFields"
              onChange={(e) => setSubscripSta(e.target.value)}
            />
          </p>
        </div>
        {/* <div>
          <p>
            Upload ID Proof of the Client
            <input
              type="file"
              id="subsripS"
              className="inputFields"
              onChange={(e) => setSubscripSta(e.target.value)}
            />
          </p>
        </div> */}
        <div>
          <p>
            Enter the Batch Time
            <input
              type="text"
              id="batchTime"
              className="inputFields"
              onChange={(e) => setBatchTime(e.target.value)}
            />
          </p>
        </div>
        <div>
          <p>
            Enter any remarks
            <input
              type="text"
              id="Remarks"
              className="inputFields"
              onChange={(e) => setRemarks(e.target.value)}
            />
          </p>
        </div>
        <Link
          className="submit-button"
          to="/newClient"
          onClick={() => handleSubmitNew()}
        >
          Submit
        </Link>
      </div>
    </div>
  );
}

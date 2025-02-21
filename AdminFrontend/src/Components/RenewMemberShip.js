import React, { useEffect, useState } from "react";
import "./RenewMemberShip.css";
import { FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";
export default function RenewMemberShip({ id }) {
  const [amountRecieved, setAmountRecieved] = useState();
  const [transacDate, setTransacDate] = useState("");
  const [transacNum, setTransacNum] = useState();
  const [subscripSta, setSubscripSta] = useState("");
  const [packageType, setPackageType] = useState("");
  const handleChange2 = (event) => {
    setPackageType(event.target.value);
  };
  useEffect(() => {
    getPackages();
  }, []);
  const [packages, setPackages] = useState();
  const getPackages = () => {
    axios
      .get("http://localhost:8081/getPackage")
      .then((res) => {
        setPackages(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const historyPostRequest = () => {
    axios
      .post("http://localhost:8081/historyPost/" + id, {
        packageType,
        subscripSta,
      })
      .then((res) => {
        console.log("Success");
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = () => {
    historyPostRequest();
    console.log("Ok");
    console.log(
      typeof amountRecieved,
      typeof transacDate,
      typeof transacNum,
      typeof subscripSta,
      typeof packageType
    );
    axios
      .put("http://localhost:8081/renew/" + id, {
        amountRecieved,
        transacDate,
        transacNum,
        subscripSta,
        packageType,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="parentRenew">
      <div className="renewMemberShip">
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
        <p>
          Amount Received
          <input
            type="number"
            id="recievedAmountRenew"
            onChange={(val) => setAmountRecieved(Number(val.target.value))}
          />
        </p>
        <p>
          Transaction Date
          <input
            type="date"
            id="recievedAmountRenew"
            onChange={(val) => {
              setTransacDate(val.target.value);
              console.log("Ok");
            }}
          />
        </p>
        <p>
          Transaction Number
          <input
            type="number"
            id="recievedAmountRenew"
            onChange={(val) => setTransacNum(Number(val.target.value))}
          />
        </p>
        <p>
          Subscription Start Date
          <input
            type="date"
            id="recievedAmountRenew"
            onChange={(val) => setSubscripSta(val.target.value)}
          />
        </p>
        <p>
          <button className="submitBtn" onClick={handleSubmit}>
            Submit
          </button>
        </p>
      </div>
    </div>
  );
}

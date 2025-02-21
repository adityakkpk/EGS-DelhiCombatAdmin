import React, { useState } from "react";
import "./NewPackage.css";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
export default function NewPackage({ setNewPackageClicked }) {
  const [packageDuration, setPackageDuration] = useState();
  const [packageType, setPackageType] = useState();
  const [packagePrice, setPackagePrice] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmitPackage = () => {
    setLoading(true);
    axios
      .post("https://egs-delhicombatadmin.onrender.com/api/newPackage", {
        packageDuration,
        packageType,
        packagePrice,
      })
      .then((res) => {
        setLoading(false);
        alert("Package Added Successfully");
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        alert("Package Added Successfully");
        console.log(err);
      });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="parentPackage">
      <div className="newPackage">
        <a className="close-btn" onClick={() => setNewPackageClicked(false)}>
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
            Number of Months
            <input
              type="text"
              id="newPackageTime"
              onChange={(val) => setPackageDuration(val.target.value)}
            />
          </p>
        </div>
        <div>
          <p>
            Package Type
            <input
              type="text"
              id="newPackageSessionType"
              onChange={(val) => setPackageType(val.target.value)}
            />
          </p>
        </div>
        <div>
          <p>
            Price
            <input
              type="number"
              id="newPackagePrice"
              onChange={(val) => setPackagePrice(val.target.value)}
            />
          </p>
        </div>
        <button
          className="submit-package"
          onClick={() => handleSubmitPackage()}
        >
          {" "}
          Submit
        </button>
      </div>
    </div>
  );
}

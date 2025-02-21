import React, { useState } from "react";
import "./NewPackage.css";
import axios from "axios";
export default function NewPackage() {
  const [packageDuration, setPackageDuration] = useState();
  const [packageType, setPackageType] = useState();
  const [packagePrice, setPackagePrice] = useState();
  const handleSubmitPackage = () => {
    axios
      .post("https://egs-delhicombatadmin.onrender.com/api/newPackage", {
        packageDuration,
        packageType,
        packagePrice,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="parentPackage">
      <div className="newPackage">
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

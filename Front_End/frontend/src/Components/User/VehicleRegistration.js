import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VRegister = () => {
  const initialState = {
    fname: "",
    lname: "",
    dob: "",
    nationality: "",
    vname: "",
    makeyear: "",
    idType: "",
    idNumber: "",
    pollution: null,
    oldRego: null,
    fromState: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [vehicleType, setVehicleType] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate random application number
    const appNumber = Math.floor(100000 + Math.random() * 900000);

    // Navigate to confirmation page with the application number
    navigate("/submitted", { state: { appNumber } });
  };

  const handleReset = () => {
    setFormData(initialState);
    setVehicleType("");
  };

  const australianStates = [
    "New South Wales",
    "Victoria",
    "Queensland",
    "Western Australia",
    "South Australia",
    "Tasmania",
    "Australian Capital Territory",
    "Northern Territory",
  ];

  const idOptions = ["Passport Number", "Photocard Number", "Driver's Licence"];

  const getIdPlaceholder = () =>
    formData.idType
      ? `Enter your ${formData.idType}`
      : "Select ID Type first";

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Vehicle Registration
      </h2>

      {/* Vehicle type selection */}
      <div className="flex justify-center gap-6 mb-6 flex-wrap text-sm sm:text-base">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="vehicleType"
            value="new"
            checked={vehicleType === "new"}
            onChange={(e) => setVehicleType(e.target.value)}
          />
          New Vehicle
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="vehicleType"
            value="renewal"
            checked={vehicleType === "renewal"}
            onChange={(e) => setVehicleType(e.target.value)}
          />
          Vehicle Renewal
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="vehicleType"
            value="interstate"
            checked={vehicleType === "interstate"}
            onChange={(e) => setVehicleType(e.target.value)}
          />
          Interstate Registration
        </label>
      </div>

      {/* Registration form */}
      {vehicleType && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              value={formData.fname}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              value={formData.lname}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />

          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />

          <input
            type="text"
            name="vname"
            placeholder="Vehicle Name"
            value={formData.vname}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />

          <input
            type="number"
            name="makeyear"
            placeholder="Make Year"
            value={formData.makeyear}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />

          {/* ID Section */}
          <div>
            <label className="block mb-1 font-medium">Select ID Type</label>
            <select
              name="idType"
              value={formData.idType}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            >
              <option value="">Choose ID Type</option>
              {idOptions.map((id, idx) => (
                <option key={idx} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Enter Your ID</label>
            <input
              type="text"
              name="idNumber"
              placeholder={getIdPlaceholder()}
              value={formData.idNumber}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
              disabled={!formData.idType}
            />
          </div>

          <div>
            <label className="block mb-1">Upload Pollution Certificate</label>
            <input
              type="file"
              name="pollution"
              onChange={handleChange}
              accept=".pdf,.jpg,.png"
              required
              className="border p-2 rounded w-full"
            />
          </div>

          {vehicleType === "renewal" && (
            <div>
              <label className="block mb-1">Upload Old Rego Document</label>
              <input
                type="file"
                name="oldRego"
                onChange={handleChange}
                accept=".pdf,.jpg,.png"
                required
                className="border p-2 rounded w-full"
              />
            </div>
          )}

          {vehicleType === "interstate" && (
            <div>
              <label className="block mb-1 font-medium">From which state?</label>
              <select
                name="fromState"
                value={formData.fromState}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              >
                <option value="">Select State</option>
                {australianStates.map((state, idx) => (
                  <option key={idx} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-1/2"
            >
              Register Vehicle
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 w-1/2"
            >
              Reset
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default VRegister;

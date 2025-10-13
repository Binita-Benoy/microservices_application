import React, { useState } from "react";
function BirthApplication() {
  const initialformstate = {
    fname: "",
    lname: "",
    date: "",
    time: "",
    place: "",
    bloodgroup: "",
    hospital: "",
    file: null,
    identity: null,
  };
  const [form, setForm] = useState(initialformstate);

  const handleclickfunction = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm({ ...form, [name]: files[0] });
  };

  const handleReset = () => {
    setForm(initialformstate); // Reset to initial state
  };
  return (
    <div>
      <center>
        <form>
          <h1>Birth Certificate Application</h1>
          <div className="birthapp-name">
            <input
              type="text"
              placeholder="First Name"
              name="fname"
              onChange={handleclickfunction}
              className="form-control"
              required
            />
          </div>
          <div>
            <input
              ype="text"
              placeholder="Last Name"
              name="lname"
              onChange={handleclickfunction}
              className="form-control"
              required
            />
          </div>
          <div>
            <input
              type="date"
              name="date"
              onChange={handleclickfunction}
              className="form-control"
              required
            />
          </div>
          <div>
            <input
              type="time"
              name="time"
              onChange={handleclickfunction}
              className="form-control"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Place of Birth "
              name="place"
              onChange={handleclickfunction}
              className="form-control"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Name Of Hospital"
            name="hospital"
            onChange={handleclickfunction}
            className="form-control"
            required
          />
          <table>
            <tbody>
            <tr>
            <td>Upload the Proof from Hospital : </td>
            <td>
              <input
                type="file"
                placeholder="Upload the Proof"
                onChange={handleFileChange}
                className="form-control"
                name="file"
                required
              />
            </td>
          </tr>  
          <tr>
            <td>Upload the ID of Parent/Guardian</td>
            <td>
              <input
                type="file"
                placeholder="Upload the Proof"
                onChange={handleFileChange}
                className="form-control"
                name="identity"
                required
              />
            </td>
          </tr>
          </tbody>
          </table>
          <div>
            <button type="submit" className="btn btn-primary">
              
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>
        </form>
      </center>
    </div>
  );
}

export default BirthApplication;

import React, { useState } from "react";
// import "../User/userreg.css"
function UserRegistration() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contactno: "",
    idno: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const API_BASE = "http://192.168.1.16:5005";
  const handleclick = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(form)
  const onSubmitdata = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Registration failed");

    alert(`Registered! User ID: ${data.user_id}`);

    // optionally clear form
    // setForm({ firstname:"", lastname:"", email:"", contactno:"", idno:"", password:"" });
  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="userregcustomer-form">
      <center>
        <form onSubmit={onSubmitdata}>
          <h1>REGISTRATION</h1>

          <div className="userregcustomer-details">
            <div className="userregcustomer-name">
              <div className="row gt-2">
                <div className="col-auto">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstname"
                    onChange={handleclick}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastname"
                    onChange={handleclick}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="userregno-email-pass">
              <input
                type="text"
                placeholder="Contact No"
                name="contactno"
                onChange={handleclick}
                className="form-control"
                required
              />
              <br />
              <input
                id="userreg_email"
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleclick}
                className="form-control"
                required
              />
              <br />
              <input
                id="userreg_pass"
                type="password"
                placeholder=" Password"
                onChange={handleclick}
                name="password"
                className="form-control"
                required
              />
            </div>
            <div >
                <input 
                  id="userreg_idnumber"
                  type="text"
                  placeholder="Photocard / Passport No"
                  onChange={handleclick}
                  name="idno"
                  className="form-control"
                  required
                />
            </div>


            <button type="submit" className="btn btn-danger">
              Register
            </button>
            <br />
          </div>
        </form>
      </center>
    </div>
  );
}

export default UserRegistration;

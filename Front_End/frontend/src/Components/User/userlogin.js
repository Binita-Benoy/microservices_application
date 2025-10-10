import React, { useState } from "react";
import "../User/userlogin.css"
import {Link} from "react-router-dom"
function UserLogin() {
    const [form, setForm] = useState({
        email:"",
        password: ""
    })

    const HandleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    console.log(form)

    

    return(
        <div className="user_page">
      <div className="user_login">
        <form >
          <h3>USER LOGIN</h3>
          <div className="userlogin_username">
            <div className="row gt-2">
              <div className="col-auto">
                <input
                  type="email"
                  name="email"
                  // maxLength={20}
                  placeholder="enter your mail id"
                  className="form-control"
                  onChange={HandleChange}
                />
              </div>
            </div>
          </div>

          <div className="usrlogin_password">
            <div className="row gt-2">
              <div className="col-auto">
                <input
                  type="Password"
                  name="password"
                
                  placeholder="password"
                  className="form-control"
                  onChange={HandleChange}
                />
              </div>
            </div>
          </div>

          <button className="btn btn-danger " type="submit">
            Login
          </button>
          <br />
          <div className="user_last">
          <div className="user_createnew">
          <Link
              to={`/userregistration`}
             style={{fontSize:"16px", marginLeft:"1rem",textDecoration:"none",color:"white"}}
            
            >
              Create New Account 
            </Link>
          </div>
          <div className="user_forgot">
            <Link
              to={`/forgotpass`}
              style={{ color: "white", marginLeft: "5rem" ,textDecoration:"none"}}
            
            >
              Forgot Password?
            </Link>
          </div>
          </div>
          
        </form>
      </div>
    </div>
    )
}

export default UserLogin

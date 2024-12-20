import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Signup.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axiosConfig from "../Utility/axiosConfig";

function Signup() {
  const [showpassword, setShowpassword] = useState(false);

  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    const userValue = userNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    const firstnameValue = firstNameDom.current.value;
    const lastnameValue = lastNameDom.current.value;

    try {
      await axiosConfig.post("/users/register", {
        username: userValue,
        email: emailValue,
        password: passwordValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
      });
      alert("User registered successfully. Please login");

      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed");
    }
  }
  return (
    <>
      <br />
      <br />
      <br />
      <div className="main-content pb-5">
        {/* <div className="page-content">
          <div className="container-fluid"> */}
        <div className="row">
          <div className="col-lg-3"></div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="text-center">
                  <b>Join the network</b>
                </div>
                <div className="text-center mb-3">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{ color: "#ff8500", textDecoration: "none" }}
                  >
                    Sign in
                  </Link>
                </div>
                {errorMessage && (
                  <span style={{ color: "red",position:"relative",padding:"0 60px" }}>{errorMessage}</span>
                )}
                <form onSubmit={handleSubmit}>
                  <input
                    ref={userNameDom}
                    placeholder="Username"
                    type="text"
                    name="username"
                    id=""
                    className="form-control"
                  />
                  <br />
                  <div className="row">
                    <div class="col-md-6">
                      <input
                        ref={firstNameDom}
                        placeholder="Firstname"
                        type="text"
                        name="firstname"
                        id=""
                        className="form-control"
                      />
                    </div>
                    <div class="col-md-6">
                      <input
                        ref={lastNameDom}
                        placeholder="Lastname"
                        type="text"
                        name="lastname"
                        id=""
                        className="form-control"
                      />
                    </div>
                  </div>
                  <br />
                  <input
                    ref={emailDom}
                    placeholder="Email Address"
                    type="email"
                    name="email"
                    id=""
                    className="form-control"
                  />
                  <br />
                  <div className={classes.password_container}>
                    <input
                      ref={passwordDom}
                      placeholder="Password"
                      type={showpassword ? "text" : "password"}
                      name="password"
                      id=""
                      className="form-control"
                    />
                    <br />
                    <div
                      className={classes.password}
                      onClick={() => setShowpassword((prev) => !prev)}
                    >
                      {showpassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>

                  <p>
                    I agree to the{" "}
                    <Link
                      to={"https://www.evangadi.com/legal/privacy/"}
                      style={{ color: "#ff8500" }}
                    >
                      privacy policy{" "}
                    </Link>
                    and{" "}
                    <Link
                      to={"https://www.evangadi.com/legal/terms/"}
                      style={{ color: "#ff8500" }}
                    >
                      terms of service
                    </Link>
                  </p>
                  <p>
                    <button
                      type="submit"
                      className={classes.btnsignup}
                      //   onClick={() => navigate("/login")} // Trigger navigation directly on click
                    >
                      Agree and Join
                    </button>
                  </p>
                  <p>
                    <Link
                      style={{ color: "#ff8500", textDecoration: "none" }}
                      to="/login"
                    >
                      Already have account?
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* <div className="col-lg-4">
                <br />
                <br />
                <br />
                <small style={{ color: "#ff8500" }}>About</small>
                <h2 className={classes.title}>Evangadi Networks</h2>
                <p className={classes.font}>
                  No matter what stage of life you are in, whether you’re just
                  starting elementary school or being promoted to CEO of a
                  Fortune 500 company, you have much to offer to those who are
                  trying to follow in your footsteps.
                </p>
                <p className={classes.font}>
                  Wheather you are willing to share your knowledge or you are
                  just looking to meet mentors of your own, please start by
                  joining the network here.
                </p>
                <p>
                  <Link
                    className={classes.btnblue}
                    to="/"
                    style={{ textDecoration: "none" }}
                  >
                    CREATE A NEW ACCOUNT
                  </Link>
                </p>
              </div> */}
          {/* </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Signup;

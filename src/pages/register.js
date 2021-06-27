import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export default class Register extends Component {
  state = {
    username: "",
    name: "",
    email: "",
    password: "",
    redirect: false,
    authError: false,
    isLoading: false,
    role: localStorage.getItem("user"),
  };
  //if(localStorage.getItem("isLoggedIn")!=NULL & localStorage.getItem("isLoggedIn")==true)
  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };
  handleEmailChange = (event) => {
    console.log(this.state.role);
    this.setState({ email: event.target.value });
  };
  handlePwdChange = (event) => {
    this.setState({ password: event.target.value });
  };
  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const url = "http://localhost:8000/api/signup";
    const email = this.state.email;
    const role = this.state.role;
    const password = this.state.password;
    const full_name = this.state.name;
    const username=this.state.username;
    let bodyFormData = new FormData();
    bodyFormData.set("role", role);
    bodyFormData.set("email", email);
    
    bodyFormData.set("full_name", full_name);
    bodyFormData.set("username", username);
    bodyFormData.set("password", password);
    axios
      .post(url, bodyFormData)
      .then((result) => {
        this.setState({ isLoading: false });
        if (result.data.status !== "fail") {
          this.setState({ redirect: true, authError: true });
        } else {
          this.setState({ redirect: false, authError: true });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ authError: true, isLoading: false });
      });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
  };

  render() {
    const isLoading = this.state.isLoading;
    return (
      <div className="container">
        <div className="card card-login mx-auto mt-5">
          <div className="card-header">Register</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <div className="form-label-group">
                  <input
                    type="text"
                    id="inputUsername"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    onChange={this.handleUsernameChange}
                    required
                  />
                  <label htmlFor="inputUsername">Username</label>
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <input
                    type="text"
                    id="inputName"
                    className="form-control"
                    placeholder="name"
                    name="name"
                    onChange={this.handleNameChange}
                    required
                  />
                  <label htmlFor="inputName">Full Name</label>
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-group">
                  <input
                    id="inputEmail"
                    className={
                      "form-control " +
                      (this.state.authError ? "is-invalid" : "")
                    }
                    placeholder="Email address"
                    type="text"
                    name="email"
                    onChange={this.handleEmailChange}
                    autoFocus
                    required
                  />
                  <label htmlFor="inputEmail">Email address</label>
                  <div className="invalid-feedback">
                    Please provide a valid Email. or Email Exis
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="******"
                    name="password"
                    onChange={this.handlePwdChange}
                    required
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  disabled={this.state.isLoading ? true : false}
                >
                  Register &nbsp;&nbsp;&nbsp;
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <span></span>
                  )}
                </button>
              </div>
            </form>
            <div className="text-center">
              <Link className="d-block small mt-3" to={"/login"}>
                Login Your Account
              </Link>
              <Link className="d-block small" to={"#"}>
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
        {this.renderRedirect()}
      </div>
    );
  }
}

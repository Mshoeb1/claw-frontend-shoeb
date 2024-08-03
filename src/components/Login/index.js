import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect, Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebookF, FaTwitter } from "react-icons/fa";
import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
    isLoggedIn: true,
  };

  onChangeEmail = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({
      showSubmitError: true,
      errorMsg: "Invalid Username and Password",
    });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "http://localhost:4002/login";
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:4002",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer ACCESS-TOKEN",
      },
      body: JSON.stringify(userDetails),
    };
    console.log(userDetails);
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok === true) {
      console.log(data);
      localStorage.setItem("user_id", data.id);
      this.onSubmitSuccess(data.jwt_token);
    } else {
      console.log(data);
      this.onSubmitFailure();
    }
  };

  renderPasswordField = () => {
    const { password } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  renderEmailField = () => {
    const { username } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeEmail}
          placeholder="Email"
        />
      </>
    );
  };

  render() {
    const { showSubmitError, errorMsg, isLoggedIn } = this.state;
    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }

    const textToShow = isLoggedIn
      ? "Don't have Account? Sign-up Here"
      : "Already have an account Login Here";

    return (
      <div className="login-form-container">
        <div className="login-body-container">
          <div className="login-first-container">
            <div className="login-image-container">
              <p className="login-para">Nice to see you again</p>
              <h1 className="login-heading">
                Hello, <br />{" "}
                <span className="span-heading"> Welcome Back!</span>
              </h1>
            </div>
            <div className="icon-container">
              <p className="follow-para">FOLLOW US</p>
              <a
                href="https://github.com/Mshoeb1"
                target="_blank"
                rel="noreferrer"
                className="icon-colour  home-social-icons"
              >
                <FaGithub className="icon" />
              </a>{" "}
              <a
                href="https://www.linkedin.com/in/mohammad-shoeb-425573bb/"
                target="_blank"
                rel="noreferrer"
                className="icon-colour  home-social-icons"
              >
                <FaLinkedin className="icon" />
              </a>{" "}
              <a
                href="www.twitter.com"
                target="_blank"
                rel="noreferrer"
                className="icon-colour  home-social-icons"
              >
                <FaTwitter className="icon" />
              </a>{" "}
              <a
                href="www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="icon-colour  home-social-icons"
              >
                <FaFacebookF className="icon" />
              </a>
            </div>
          </div>
          <form className="form-container" onSubmit={this.submitForm}>
            <h1>Login</h1>
            <div className="input-container">{this.renderEmailField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <div className="check-box-container">
              <div className="check-sub-container">
                <input
                  type="checkbox"
                  value="check"
                  className="check-box"
                  id="checkbox"
                />
                <label htmlFor="checkbox" className="Check-label">
                  Remember Me
                </label>
              </div>
              <p className="forgot-para">Forgot Password</p>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            <p className="account-para">
              <Link to="/register">
                <span className="account-span">{textToShow}</span>
              </Link>
            </p>
            <footer className="footer">
              Designed and Developed By Mohammad Shoeb
            </footer>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;

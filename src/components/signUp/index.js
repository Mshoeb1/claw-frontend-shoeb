import { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebookF, FaTwitter } from "react-icons/fa";
import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    mobile: "",
    showSubmitError: false,
    errorMsg: "",
    isSignUpIn: false,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangeMobile = (event) => {
    this.setState({ mobile: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    history.replace("/login");
    this.setState({ isSignUpIn: true });
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, email, password, mobile } = this.state;
    const userDetails = { username, email, password, mobile };
    const url = "https://final-database.onrender.com/register";
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "https://final-database.onrender.com",
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
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
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
    const { email } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          id="email"
          className="password-input-field"
          value={email}
          onChange={this.onChangeEmail}
          placeholder="Email"
        />
      </>
    );
  };

  renderUsernameField = () => {
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
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    );
  };

  renderMobileField = () => {
    const { mobile } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="mobile"
          className="username-input-field"
          value={mobile}
          onChange={this.onChangeMobile}
          placeholder="Mobile Number"
        />
      </>
    );
  };

  render() {
    const { showSubmitError, errorMsg, isSignUpIn } = this.state;

    if (isSignUpIn) {
      return <Redirect to="/login" />;
    }

    const textToShow = isSignUpIn
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
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              className="login-website-logo-desktop-img"
              alt="website logo"
            />
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderEmailField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <div className="input-container">{this.renderMobileField()}</div>
            <button type="submit" className="login-button">
              SIGN UP
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            <p className="account-para">
              <Link to="/login">
                <span className="account-span">{textToShow}</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;

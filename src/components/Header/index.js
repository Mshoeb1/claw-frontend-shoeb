import { Link, withRouter } from "react-router-dom";
import { TbPhotoDown } from "react-icons/tb";
import Cookies from "js-cookie";
import { MdOutlineLogout } from "react-icons/md";

import "./index.css";

const Header = (props) => {
  const onClickLogout = () => {
    const { history } = props;

    Cookies.remove("jwt_token");
    history.replace("/login");
  };

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <TbPhotoDown className="todo-icon" />
          </Link>

          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onClickLogout}
          >
            <MdOutlineLogout className="nav-bar-img" />
          </button>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <TbPhotoDown className="todo-icon" />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="nav-bar-img"
              />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Header);

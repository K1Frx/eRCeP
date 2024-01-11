import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { AppContext } from "../../App";
import { useStorageState } from "../../hooks/useStorageState";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import { smallModal } from "../smallComponents/smallComponents";

function Navbar() {
  const { setLoading } = useContext(AppContext);
  let loginToken = useStorageState({ state: "loginToken" });
  const [disabled, setDisabled] = useState<boolean>(false);
  const [logoutConfirmation, setLogoutConfirmation] = useState<boolean>(false);

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const logout = () => {
    setLoading(true);
    setDisabled(true);
    setTimeout(() => {
      loginToken.setStorageState("");
      setLogoutConfirmation(false);
      setDisabled(false);
      setLoading(false);
    }, 500);
  }

  return (
    <nav className="navbar-site">
      {logoutConfirmation &&
        smallModal({
          onHideFunction: () => setLogoutConfirmation(false),
          onClickFunction: logout,
          title: "Logout",
          text: "Are you sure you want to logout?",
          buttonText: "Logout",
          disabled: disabled
        })
      }
      <div className="navbar-top">
        <Link to="/#" onClick={closeMobileMenu} className="navbar-logo">
          <h1><FontAwesomeIcon icon={faClock} style={{ paddingRight: "1rem" }} />eRCeP</h1>
        </Link>
        <div className="menu-icon" onClick={handleClick}>
           <FontAwesomeIcon icon={click ? faXmark : faBars} style={{ color: "white" }} /> 
        </div>
        <div className="navbar-user">
          Hello, User
        </div>
      </div>
      <div className={click ? "nav-menu active" : "nav-menu"}>
        <div className="nav-item">
          <Link
            to="/timesheets"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Timesheets
          </Link>
        </div>
        <div className="nav-item">
          <Link
            to="/workers"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Workers
          </Link>
        </div>
        <>
          <div className="nav-item">
            <Link
              to="/employers"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Employers
            </Link>
          </div>
        </>
        <div className="nav-item">
          <Link
            to="/admin"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Admin
          </Link>
        </div>
        <div className="nav-item">
          <Link
            to="/about"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            About
          </Link>
        </div>
        <div className="nav-item">
          <div className="bottom-buttons">
            <Link
              to="/settings"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              <FontAwesomeIcon icon={faGear} />
            </Link>
            <button
              disabled={!loginToken.store || disabled}
              className="nav-links logout-button"
              onClick={() => {closeMobileMenu(); setLogoutConfirmation(true)}}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

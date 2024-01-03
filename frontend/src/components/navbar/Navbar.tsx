import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  return (
    <nav className="navbar-site">
      <div className="navbar-top">
        <Link to="/#" onClick={closeMobileMenu} className="navbar-logo">
          <h1><FontAwesomeIcon icon={faClock} style={{ paddingRight: "1rem" }} />eRCeP</h1>
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FontAwesomeIcon icon={faXmark} style={{ color: "white" }} /> : <FontAwesomeIcon icon={faBars} style={{ color: "white" }} />}
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
        <div className="bottom-buttons">
        <Link
            to="/settings"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            <FontAwesomeIcon icon={faGear} />
          </Link>
          <button
            className="nav-links"
            onClick={() => {alert("You have been logged out.")}}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
          </div>
      </div>
    </nav>
  );
}

export default Navbar;

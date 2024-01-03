import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  return (
    <>
      <nav className="navbar-site">
        <div className="navbar-container">
          <Link to="/#" onClick={closeMobileMenu} className="navbar-logo">
            {/* <Logo /> */} LOGO
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <div className={click ? "nav-menu active" : "nav-menu"}>
            <div className="nav-item">
              <Link
                to="https://ticketclub.pl/koncerty/varsonalia-pw-2023-dzien-i-stadion-syrenka-warszawa-2208/"
                className="nav-links tickets"
                onClick={closeMobileMenu}
                target="_blank"
                rel="noopener noreferrer"
              >
                KUP BILET
              </Link>
            </div>
            <div className="nav-item">
              <Link
                to="/#lineup"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                LINE-UP
              </Link>
            </div>
            {window.innerWidth > 960 &&
              <>
                <div className="nav-item">
                  <Link
                    to="/#archive"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    GALERIA
                  </Link>
                </div>
              </>
            }

            <div className="nav-item">
              <Link
                to="/#juweteam"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                JUWETEAM
              </Link>
            </div>
            <div className="nav-item">
              <Link
                to="/#faq"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

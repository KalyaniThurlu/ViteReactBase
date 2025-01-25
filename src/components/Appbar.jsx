import  { useState } from "react";
import { Link } from "react-router-dom";
import "./appbar.css";

export function Appbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header
        className="d-flex align-items-center justify-content-between text-white p-3"
        style={{ backgroundColor: "#6f42c1", height: 65 }}
      >
        {/* Hamburger Menu Button */}
        <button
          className="btn text-white p-0"
          style={{ background: "none", border: "none" }}
          onClick={handleClick}
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            style={{
              display: "inline-block",
              width: "30px",
              height: "3px",
              backgroundColor: "white",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                content: '""',
                width: "30px",
                height: "3px",
                backgroundColor: "white",
                top: "-8px",
              }}
            ></span>
            <span
              style={{
                position: "absolute",
                content: '""',
                width: "30px",
                height: "3px",
                backgroundColor: "white",
                top: "8px",
              }}
            ></span>
          </span>
        </button>

        {/* Title */}
        <h1 className="m-0 text-center" style={{ flex: 1 }}>
          Weather App
        </h1>
      </header>


      {/* Sliding Menu */}
      <div className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/home" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/instant" onClick={closeMenu}>
              Instant
            </Link>
          </li>
          <li>
            <Link to="/forecast" onClick={closeMenu}>
              Forecast
            </Link>
          </li>
          <li>
            <Link to="/future" onClick={closeMenu}>
              Future
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
import React from "react";
import PrimarySearchAppBar from "./Menu";

export default function Base({
  title = "My Title",
  description = "My Description",
  className = "p-4",
  children,
}) {
  return (
    <div>
      <PrimarySearchAppBar />
      <div className="container-fluid">
        <div className="text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <p className={className}>{children}</p>
      </div>
      <footer className="footer mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>Made by Paras Garg</h4>
          <a className="nav-link" href="https://www.linkedin.com/in/parasdec2/">
            <button className="btn btn-info btn-lg">Linked In Profile</button>
          </a>
        </div>
        <div className="container">
          <span className="text-muted">
            An amazing <span className="text-dark">MERN</span> Bootcamp
          </span>
        </div>
      </footer>
    </div>
  );
}

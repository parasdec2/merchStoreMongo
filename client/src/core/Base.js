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
          <h4>If you got any questions feel free to reach out!</h4>
          <button className="btn btn-warning btn-lg">Contact Us</button>
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

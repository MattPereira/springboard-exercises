import React from "react";
import { Link, Redirect } from "react-router-dom";

const DogDetails = ({ dog }) => {
  if (!dog) return <Redirect to="/dogs" />;
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-6">
          <h1>{dog.name}</h1>
          <h4>{dog.age} years old</h4>
          <img src={dog.src} alt={dog.name} className="img-fluid" />
          <ul>
            {dog.facts.map((fact, idx) => (
              <li key={idx}>{fact}</li>
            ))}
          </ul>
          <Link to="/dogs">Go Back</Link>
        </div>
      </div>
    </div>
  );
};

export default DogDetails;

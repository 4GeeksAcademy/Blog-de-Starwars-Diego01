import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Single = () => {
  const { type, theid } = useParams();
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/${type}/${theid}`)
      .then(res => res.json())
      .then(data => {
        if (data.result) {
          setItemDetails(data.result.properties);
        }
      })
      .catch(err => console.error("Error fetching details:", err));
  }, [type, theid]);

  if (!itemDetails) {
    return (
      <div className="text-center mt-5 text-white">
        <div className="spinner-border text-danger" role="status"></div>
        <h1 className="mt-3">Consultando los archivos de la República...</h1>
      </div>
    );
  }

  return (
    <div className="container mt-5 text-white bg-dark p-4 rounded shadow border border-secondary">
      <div className="row">
        <div className="col-md-6 text-center">
          <div className="col-md-6 text-center d-flex align-items-center justify-content-center bg-black rounded border border-secondary" style={{ minHeight: "400px" }}>
            <img
              src="https://raw.githubusercontent.com/4GeeksAcademy/exercise-starwars-blog-reading-list/master/src/img/4geeks.png"
              className="img-fluid p-4"
              style={{ maxHeight: "300px", objectFit: "contain" }}
              alt="Star Wars Placeholder"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png";
              }}
            />
          </div>
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h1 className="display-4 text-danger fw-bold">{itemDetails.name}</h1>
          <p className="lead mt-3">
            Estás viendo la información oficial de <strong>{itemDetails.name}</strong>.
            Este registro ha sido recuperado de la base de datos galáctica, filtrando por la categoría de {type}.
          </p>
          <Link to="/" className="btn btn-outline-danger mt-3 w-50">
            <i className="fas fa-arrow-left me-2"></i>Volver al Inicio
          </Link>
        </div>
      </div>

      <hr className="my-5 border-danger" style={{ opacity: "0.5" }} />

      <div className="row text-danger text-center fw-bold">
        <div className="col-2 border-end border-secondary">
          <p className="mb-1 text-secondary small">Name</p>
          <span className="text-white fw-normal">{itemDetails.name}</span>
        </div>

        {type === "people" ? (
          <>
            <div className="col-2 border-end border-secondary">
              <p className="mb-1 text-secondary small">Birth Year</p>
              <span className="text-white fw-normal">{itemDetails.birth_year}</span>
            </div>
            <div className="col-2 border-end border-secondary">
              <p className="mb-1 text-secondary small">Gender</p>
              <span className="text-white fw-normal">{itemDetails.gender}</span>
            </div>
            <div className="col-2 border-end border-secondary">
              <p className="mb-1 text-secondary small">Height</p>
              <span className="text-white fw-normal">{itemDetails.height}</span>
            </div>
            <div className="col-2 border-end border-secondary">
              <p className="mb-1 text-secondary small">Skin Color</p>
              <span className="text-white fw-normal">{itemDetails.skin_color}</span>
            </div>
            <div className="col-2">
              <p className="mb-1 text-secondary small">Eye Color</p>
              <span className="text-white fw-normal">{itemDetails.eye_color}</span>
            </div>
          </>
        ) : type === "vehicles" ? (
          <>
            <div className="col-2 border-end border-secondary">
              <p className="mb-1 text-secondary small">Model</p>
              <span className="text-white fw-normal">{itemDetails.model}</span>
            </div>
            <div className="col-2 border-end border-secondary">
              <p className="mb-1 text-secondary small">Class</p>
              <span className="text-white fw-normal">{itemDetails.vehicle_class}</span>
            </div>
            <div className="col-2 border-end border-secondary">
              <p className="mb-1 text-secondary small">Cost (Credits)</p>
              <span className="text-white fw-normal">{itemDetails.cost_in_credits}</span>
            </div>
            <div className="col-2 border-end border-secondary">
              <p className="mb-1 text-secondary small">Passengers</p>
              <span className="text-white fw-normal">{itemDetails.passengers}</span>
            </div>
            <div className="col-2">
              <p className="mb-1 text-secondary small">Length</p>
              <span className="text-white fw-normal">{itemDetails.length}m</span>
            </div>
          </>
        ) : (
          <>
            <div className="col-2 border-end border-secondary">
              <p className="mb-1 text-secondary small">Climate</p>
              <span className="text-white fw-normal">{itemDetails.climate}</span>
            </div>
            <div className="col-2 border-end border-secondary">
              <p className="mb-1 text-secondary small">Population</p>
              <span className="text-white fw-normal">{itemDetails.population}</span>
            </div>
            <div className="col-2 border-end border-secondary">
              <p className="mb-1 text-secondary small">Diameter</p>
              <span className="text-white fw-normal">{itemDetails.diameter}</span>
            </div>
            <div className="col-2 border-end border-secondary">
              <p className="mb-1 text-secondary small">Terrain</p>
              <span className="text-white fw-normal">{itemDetails.terrain}</span>
            </div>
            <div className="col-2">
              <p className="mb-1 text-secondary small">Gravity</p>
              <span className="text-white fw-normal">{itemDetails.gravity}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Single;
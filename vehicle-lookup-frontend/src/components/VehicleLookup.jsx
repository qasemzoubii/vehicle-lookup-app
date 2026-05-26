import React, { useState, useEffect } from "react";
import "./VehicleLookup.css";

const API_BASE =
  "http://localhost:5215/api/vehicle" || process.env.REACT_APP_API_URL;

function VehicleLookup() {
  const [makes, setMakes] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [models, setModels] = useState([]);

  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [loadingMakes, setLoadingMakes] = useState(true);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);

  const [error, setError] = useState("");

  // Generate years from 1995 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1994 },
    (_, i) => currentYear - i,
  );

  // Load all makes on start
  useEffect(() => {
    fetch(`${API_BASE}/makes`)
      .then((res) => res.json())
      .then((data) => {
        setMakes(data);
        setLoadingMakes(false);
      })
      .catch(() => {
        setError("Failed to load makes");
        setLoadingMakes(false);
      });
  }, []);

  // Load vehicle types when make changes
  useEffect(() => {
    if (!selectedMake) return;
    setLoadingTypes(true);
    setVehicleTypes([]);
    setModels([]);
    setSelectedType("");

    fetch(`${API_BASE}/types/${selectedMake}`)
      .then((res) => res.json())
      .then((data) => {
        setVehicleTypes(data);
        setLoadingTypes(false);
      })
      .catch(() => {
        setError("Failed to load vehicle types");
        setLoadingTypes(false);
      });
  }, [selectedMake]);

  // Load models when make + year are selected
  useEffect(() => {
    if (!selectedMake || !selectedYear) return;
    setLoadingModels(true);
    setModels([]);

    fetch(`${API_BASE}/models/${selectedMake}/${selectedYear}`)
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        setLoadingModels(false);
      })
      .catch(() => {
        setError("Failed to load models");
        setLoadingModels(false);
      });
  }, [selectedMake, selectedYear]);

  return (
    <div className="container">
      <h1>🚗 Vehicle Lookup 🚗</h1>
      <p className="subtitle">Search vehicle models by make, year, and type</p>

      {error && <div className="error">{error}</div>}

      <div className="filters">
        {/* Make Dropdown */}
        <div className="filter-group">
          <label>Car Make</label>
          {loadingMakes ? (
            <div className="loading">Loading makes...</div>
          ) : (
            <select
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
            >
              <option value="">-- Select Make --</option>
              {makes.map((make) => (
                <option key={make.make_ID} value={make.make_ID}>
                  {make.make_Name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Vehicle Type */}
        <div className="filter-group">
          <label>Vehicle Type</label>
          {loadingTypes ? (
            <div className="loading">Loading types...</div>
          ) : (
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              disabled={!selectedMake}
            >
              <option value="">-- All Types --</option>
              {vehicleTypes.map((type) => (
                <option key={type.vehicleTypeId} value={type.vehicleTypeName}>
                  {type.vehicleTypeName}
                </option>
              ))}
            </select>
          )}
        </div>
        {/* Year Dropdown */}
        <div className="filter-group">
          <label>Manufacture Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            disabled={!selectedMake}
          >
            <option value="">-- Select Year --</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="results">
        {loadingModels && <div className="loading">Loading models...</div>}

        {!loadingModels &&
          models.length === 0 &&
          selectedMake &&
          selectedYear && (
            <div className="no-results">
              No models found for the selected criteria.
            </div>
          )}

        {!loadingModels && models.length > 0 && (
          <>
            <h2>Available Models ({models.length})</h2>
            <div className="models-grid">
              {models.map((model) => (
                <div key={model.model_ID} className="model-card">
                  <span className="model-name">{model.model_Name}</span>
                  <span className="make-name">{model.make_Name}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VehicleLookup;

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function ParkingList() {
  const [parkings, setParkings] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    state: '',
    latitude: '',
    longitude: ''
  });
  const [locationAccessGranted, setLocationAccessGranted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);  // Track the current page
  const [pageSize, setPageSize] = useState(10);  // Number of items per page
  const [totalCount, setTotalCount] = useState(0);  // Total number of items (for pagination)

  // Memoize fetchParkings function using useCallback
  const fetchParkings = useCallback(async () => {
    try {
      setLoading(true); // Start loading
      const { city, state, latitude, longitude } = filters;
      let url = `${API_BASE_URL}/parkings?page=${currentPage}&page_size=${pageSize}`;

      if (city) url += `&city=${city}`;
      if (state) url += `&state=${state}`;
      if (latitude && longitude) url += `&latitude=${latitude}&longitude=${longitude}`;

      const response = await axios.get(url);
      setParkings(response.data.results);
      setTotalCount(response.data.total_count);  // Set the total count from the response
    } catch (error) {
      console.error("There was an error fetching the parkings!", error);
    } finally {
      setLoading(false); // End loading
    }
  }, [filters, currentPage, pageSize]); // include filters, currentPage, and pageSize as dependencies

  // Effect hook to fetch data when component mounts or filters or pagination change
  useEffect(() => {
    fetchParkings();
  }, [fetchParkings]);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Request location access and set coordinates
  const requestLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          setFilters((prevFilters) => ({
            ...prevFilters,
            latitude,
            longitude
          }));
          setLocationAccessGranted(true); // Mark location access as granted
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationAccessGranted(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLocationAccessGranted(false);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      city: '',
      state: '',
      latitude: '',
      longitude: ''
    });
    setLocationAccessGranted(false);
    setCurrentPage(1); // Reset to the first page when clearing filters
  };

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));  // Update the pageSize based on user selection
    setCurrentPage(1);  // Reset to the first page when changing page size
  };

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Parking List</h2>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="State"
            name="state"
            value={filters.state}
            onChange={handleFilterChange}
          />
        </div>
        {/* Latitude and Longitude are automatically populated */}
        {!locationAccessGranted && (
          <div className="col-md-3">
            <button className="btn btn-primary w-100" onClick={requestLocationAccess}>
              Search by Location
            </button>
          </div>
        )}

        {/* Clear Filters Button */}
        <div className="col-md-3">
          <button className="btn btn-secondary w-100" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Page Size Selector */}
      <div className="row mb-4">
        <div className="col-md-3">
          <select
            className="form-control"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={10}>10 items per page</option>
            <option value={20}>20 items per page</option>
            <option value={50}>50 items per page</option>
          </select>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center mb-4">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/* Parking List */}
      <div className="row">
        {parkings.map((parking) => (
          <div key={parking.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{parking.name}</h5>
                <p className="card-text">
                  <strong>City:</strong> {parking.city}<br />
                  <strong>State:</strong> {parking.state}<br />
                  <strong>Address:</strong> {parking.address}<br />
                  <strong>Rate:</strong> ${parking.rate}<br />
                  <strong>Capacity:</strong> {parking.capacity}<br />
                  <strong>Occupied:</strong> {parking.occupied}<br />
                  <strong>Remaining:</strong> {parking.capacity - parking.occupied}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="mx-3">Page {currentPage} of {totalPages}</span>
        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ParkingList;

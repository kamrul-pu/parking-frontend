import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const ParkingHistory = () => {
  const [parkingData, setParkingData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch parking history data from the API (replace with your actual API endpoint)
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    // Set headers to include the token for authorization
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '', // Add Bearer token if it exists
    };
    
    let url = `${API_BASE_URL}/parkings/sessions`;
    
    fetch(url, { headers }) // API endpoint for parking history
      .then(response => response.json())
      .then(data => {
        console.log("data", data)
        setParkingData(data.results);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching parking data:', error);
        setLoading(false); // Ensure loading is set to false on error as well
      });
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">Parking History</h2>
      
      {loading ? (
        // Show a loading spinner while data is being fetched
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        // If data is fetched, display the parking data in a table
        <>
          {parkingData && parkingData.length === 0 ? (
            <p>No parking records found.</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Vehicle Number</th>
                  <th>Slot</th>
                  <th>Entry Time</th>
                  <th>Exit Time</th>
                  <th>Total Amount</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {parkingData && parkingData.map((parking, index) => (
                  <tr key={index}>
                    <td>{parking.user}</td>
                    <td>{parking.vehicle_number}</td>
                    <td>{parking.slot}</td>
                    <td>{new Date(parking.entry_time).toLocaleString()}</td>
                    <td>{new Date(parking.exit_time).toLocaleString()}</td>
                    <td>${parking.total_amount}</td>
                    <td>{parking.payment_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default ParkingHistory;

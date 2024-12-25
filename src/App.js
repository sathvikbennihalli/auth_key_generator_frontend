import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [authToken, setAuthToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState(null);

  // Function to generate the auth token
  const generateAuthToken = () => {
    setLoading(true);
    setError(""); // Reset error on each new request

    axios
      .get("/generate-auth-token")
      .then((response) => {
        setAuthToken(response.data.authToken);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error generating auth token");
        setLoading(false);
        console.error("Error:", error);
      });
  };

  // Function to make the fetch request with the generated auth token
  const fetchData = () => {
    if (!authToken) {
      setError("Please generate an auth token first.");
      return;
    }
  
    setLoading(true);
    setError(""); // Reset error on each new request
  
    // Create form data
    const formData = new FormData();
    formData.append("token", authToken);
    formData.append("name", "Sathvik");
    formData.append("phone", "8088229656");
  
    axios
      .post("https://vahanbuddy.ridersync.com/vahan-crm.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Specify the content type
        },
      })
      .then((response) => {
        setResponseData(response.data); // Save the fetched data to the state
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data");
        setLoading(false);
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Fetch Data</h1>

        {/* Generate Auth Token */}
        <div className="button-container">
          <button
            className="generate-button"
            onClick={generateAuthToken}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Auth Token"}
          </button>
        </div>

        {/* Display Error Message */}
        {error && <p className="error">{error}</p>}

        {/* Display Generated Auth Token */}
        {authToken && (
          <div className="token-container">
            <h2>Generated Token:</h2>
            <p className="auth-token">{authToken}</p>
          </div>
        )}

        {/* Fetch Data */}
        <div className="button-container">
          <button
            className="fetch-button"
            onClick={fetchData}
            disabled={loading || !authToken}
          >
            {loading ? "Fetching..." : "Fetch Data"}
          </button>
        </div>

        {/* Display Response Data */}
        {responseData && (
          <div className="response-container">
            <h2>Response Data:</h2>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

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

    fetch("https://pwa-jobfinder.vahan.co/mitra/form-io/", {
      method: "POST",
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "auth-token": authToken,
        "cache-control": "no-cache, no-store, must-revalidate",
        "content-type": "application/json;charset=UTF-8",
        "cookie": `accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGlnaXBoaW5zIElubm92YXRpb24gUHJpdmF0ZSBMaW1pdGVkIiwicGhvbmVfbnVtYmVyIjoiOTA2NjgzMDM1OCIsInJvbGVJZCI6IjBlMmQyN2Y0LTRjODEtNDk3ZC05ZTcxLTc0MTY0MGQyODc4NCIsInJhbmsiOjEwMDAwLCJpYXQiOjE3MzQ1OTU3MjgsImV4cCI6MTczNTIwMDUyOCwic3ViIjoiMThiNTM2Y2QtMDY3Zi00MTMxLWExMGUtZGJjNDcwZmUyOGE4In0.gU0wWawAOOcOO01zpWrh1fzdQtJ9rru7BVcmuMTtDlc; _hjSessionUser_3228720=eyJpZCI6Ijk0NTJmMmViLTVmZTAtNWNhYy1iM2QwLTIwYzg2NjBkNDM2MyIsImNyZWF0ZWQiOjE3MzQ1OTU3MTc1MjIsImV4aXN0aW5nIjp0cnVlfQ==; _hjSession_3228720=eyJpZCI6IjMzNWFiNTdkLWZhZWEtNDAxMS1hZTg2LTA1ODQxYzUyMDE1YiIsImMiOjE3MzQ5MzE1NjA2ODEsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; _gid=GA1.2.1950257674.1734931561; mESL=s%3Aj%3A%7B%7D.VvQMglpwCmEf2%2FzQsjoQ%2BpLUBxG6P6uASvuK0x%2F0MHI; moe_uuid=2e9422b7-72e5-4e2a-8e5d-8fda56a77695; _ga=GA1.2.629293638.1734595717; _gat=1; _ga_S7YGR6V3MG=GS1.1.1734931560.10.1.1734931631.0.0.0; amp_f72206=sqzAya7rmF96PlUNwDKLmJ.MThiNTM2Y2QtMDY3Zi00MTMxLWExMGUtZGJjNDcwZmUyOGE4..1ifovle2f.1ifovnobd.1ao.1.1ap`,
        "expires": "0",
        "origin": "https://mitra-leader.vahan.co",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "referer": "https://mitra-leader.vahan.co/",
        "sec-ch-ua":
          '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        submission: {
          data: {
            sourceName: "mitra-leader",
            sourceId: "18b536cd-067f-4131-a10e-dbc470fe28a8",
            candidatePhoneNumber: "8088229656",
            phoneNumber: "8088229656",
            name: "Sathvik",
            managerMitraID: "18b536cd-067f-4131-a10e-dbc470fe28a8",
            cityPreference: "Bengaluru",
            desiredRole: "Delivery",
            clientPreference: "swiggy",
            firstLocalityPreference: "Basavanagudi",
          },
          currentPageData: {
            duplicateLeadCheck: true,
            candidatePhoneNumber: "8088229656",
            name: "Sathvik",
            phoneNumber: "8088229656",
            cityPreference: "Bengaluru",
            desiredRole: "Delivery",
            clientPreference: "swiggy",
            firstLocalityPreference: "Basavanagudi",
          },
        },
      }),
      credentials:"same-origin"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setResponseData(data); // Save the fetched data to the state
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

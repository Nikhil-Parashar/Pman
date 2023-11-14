import React, { useState, useEffect } from "react";
import Response from "./Response";

function PrevRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    async function fetchRequests() {
      const response = await fetch("http://localhost:5000/api/get-requests");
      const data = await response.json();
      setRequests(data);
    }
    fetchRequests();
  }, []);

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    console.log(JSON.parse(request.responseData));
  };

  const deleteAll = () => {
    fetch("http://localhost:5000/api/delete-requests", {
      method: "DELETE",
    });
    setRequests([]);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "10px", // Added padding for spacing
          backgroundColor: "lightgray", // Background color
        }}
      >
        <h2 style={{ marginRight: "10px" }}>Previous Requests</h2>
        <button
          onClick={deleteAll}
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            backgroundColor: "skyblue",
            border: "none",
            cursor: "pointer",
          }}
        >
          Clear History
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            paddingLeft: "20%",
            paddingRight: "10px",
          }}
        >
          {requests.map((request) => (
            <li key={request.id} style={{ marginBottom: "10px" }}>
              <button
                onClick={() => handleRequestClick(request)}
                style={{
                  backgroundColor:
                    request.method === "get"
                      ? "green"
                      : request.method === "post" || request.method === "put"
                      ? "yellow"
                      : request.method === "delete"
                      ? "orange"
                      : "gray", // Fallback color
                  marginRight: "10px",
                }}
              >
                {request.method}
              </button>
              {request.url}
            </li>
          ))}
        </ul>

        {selectedRequest && (
          <div
            style={{
              paddingLeft: "10px",
              paddingRight: "20%",
              marginLeft: "auto",
            }}
          >
            <Response data={JSON.parse(selectedRequest.responseData)} />
          </div>
        )}
      </div>
    </>
  );
}

export default PrevRequests;

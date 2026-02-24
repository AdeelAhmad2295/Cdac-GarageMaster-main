import React, { useState } from 'react';

const AcceptRequest = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      customer: "John Doe",
      vehicle: "Toyota Corolla 2020",
      service: "Oil Change & Filter",
      date: "2026-02-17",
      time: "10:30 AM",
      status: "Pending"
    },
    {
      id: 2,
      customer: "Sarah Wilson",
      vehicle: "Honda Civic 2019", 
      service: "Brake Pads Replacement",
      date: "2026-02-18",
      time: "2:00 PM",
      status: "Pending"
    },
    {
      id: 3,
      customer: "Mike Johnson",
      vehicle: "Ford F-150 2021",
      service: "Tire Rotation",
      date: "2026-02-17", 
      time: "3:15 PM",
      status: "Pending"
    }
  ]);

  const handleAccept = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'Accepted' } : req
    ));
  };

  const handleCancel = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'Cancelled' } : req
    ));
  };

  return (
    <>
      <div className="main-container">
        <div className="header">
          <h1 className="header-title">Service Requests</h1>
          <p className="header-subtitle">Manage incoming customer requests</p>
        </div>

        <div className="requests-container">
          {requests.map((request) => (
            <div 
              key={request.id} 
              className={`request-card ${request.status.toLowerCase()}`}
            >
              <div className="request-header">
                <div className="customer-info">
                  <h3 className="customer-name">{request.customer}</h3>
                  <span className="vehicle">{request.vehicle}</span>
                </div>
                <div className={`status-badge ${request.status.toLowerCase()}-badge`}>
                  {request.status}
                </div>
              </div>

              <div className="request-details">
                <div className="detail-item">
                  <span className="detail-label">Service:</span>
                  <span className="detail-value">{request.service}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{request.date}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Time:</span>
                  <span className="detail-value">{request.time}</span>
                </div>
              </div>

              {request.status === 'Pending' && (
                <div className="action-buttons">
                  <button 
                    onClick={() => handleAccept(request.id)}
                    className="accept-button"
                  >
                    ✅ Accept
                  </button>
                  <button 
                    onClick={() => handleCancel(request.id)}
                    className="cancel-button"
                  >
                    ❌ Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .main-container {
          min-height: 100vh;
          background: linear-gradient(135deg, rgb(0,0,0) 0%, rgba(230,30,50,0.05) 50%, rgb(10,10,10) 100%);
          padding: 80px 40px 40px;
        }

        .header {
          text-align: center;
          margin-bottom: 60px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .header-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 900;
          background: linear-gradient(135deg, rgb(255,255,255), rgb(230,30,50));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 15px;
          letter-spacing: -1px;
        }

        .header-subtitle {
          font-size: 1.3rem;
          color: rgba(255,255,255,0.8);
          font-weight: 400;
        }

        .requests-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 30px;
        }

        .request-card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 35px;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .request-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(230,30,50,0.2);
        }

        .request-card.pending {
          border: 2px solid rgba(200,200,200,0.4);
        }

        .request-card.accepted {
          border: 2px solid rgba(230,30,50,0.4);
          box-shadow: 0 15px 35px rgba(230,30,50,0.2);
        }

        .request-card.cancelled {
          border: 2px solid rgba(179,179,179,0.4);
          opacity: 0.7;
        }

        .request-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 25px;
        }

        .customer-info h3.customer-name {
          color: rgb(255,255,255);
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .vehicle {
          color: rgba(255,255,255,0.7);
          font-size: 1rem;
          font-weight: 500;
        }

        .status-badge {
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .pending-badge {
          color: rgb(200,200,200);
          background: rgba(200,200,200,0.2);
          border: 1px solid rgba(200,200,200,0.4);
        }

        .accepted-badge {
          color: rgb(230,30,50);
          background: rgba(230,30,50,0.2);
          border: 1px solid rgba(230,30,50,0.4);
        }

        .cancelled-badge {
          color: rgba(179,179,179,0.8);
          background: rgba(179,179,179,0.15);
          border: 1px solid rgba(179,179,179,0.3);
        }

        .request-details {
          margin-bottom: 30px;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .detail-label {
          color: rgba(255,255,255,0.6);
          font-size: 0.95rem;
          font-weight: 500;
        }

        .detail-value {
          color: rgb(255,255,255);
          font-size: 1.1rem;
          font-weight: 600;
        }

        .action-buttons {
          display: flex;
          gap: 15px;
        }

        .accept-button, .cancel-button {
          flex: 1;
          padding: 16px 24px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          border-radius: 16px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .accept-button {
          background: linear-gradient(135deg, rgb(230,30,50), rgba(230,30,50,0.9));
          color: rgb(255,255,255);
          box-shadow: 0 8px 25px rgba(230,30,50,0.3);
        }

        .accept-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(230,30,50,0.4);
        }

        .cancel-button {
          border: 2px solid rgba(179,179,179,0.3);
          background: rgba(179,179,179,0.15);
          color: rgb(255,255,255);
          backdrop-filter: blur(10px);
        }

        .cancel-button:hover {
          background: rgba(179,179,179,0.25);
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(179,179,179,0.3);
        }

        @media (max-width: 768px) {
          .main-container {
            padding: 60px 20px 20px;
          }
          .requests-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default AcceptRequest;

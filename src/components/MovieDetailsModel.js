import React from 'react';
import '../styles/style.css'; // Import your CSS file

const MovieDetailsModal = ({ isVisible, details, onClose, poster }) => {
  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Movie Details</h2>
        <div className="poster-container">
          {poster && <img src={poster} alt="Movie Poster" className="poster-image" />}
        </div>
        <div className="details-container">
          {details.length === 0 ? (
            <p>No details available</p>
          ) : (
            details.map((detail, index) => (
              <div key={index} className="detail-item">
                {detail}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;

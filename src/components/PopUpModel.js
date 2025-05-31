import React from 'react';
import '../styles/style.css'; // Import your CSS file

const PopUpModel = ({ isVisible, details, onClose }) => {
  if (!isVisible || !Array.isArray(details) || details.length === 0) return null;

  // Convert the array of "Key: Value" strings into an object for easier rendering
  const detailsObj = {};
  details.forEach(line => {
    const idx = line.indexOf(':');
    if (idx !== -1) {
      const key = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      // Special handling for Poster and Ratings
      if (key === "Poster") {
        detailsObj[key] = value;
      } else if (key === "Ratings") {
        try {
          detailsObj[key] = JSON.parse(value);
        } catch {
          detailsObj[key] = value;
        }
      } else {
        detailsObj[key] = value;
      }
    }
  });

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2 style={{ marginTop: 0 }}>{detailsObj.Title || "Movie Details"}</h2>
        <div className="details-container">
          {detailsObj.Poster && (
            <img
              src={detailsObj.Poster}
              alt={detailsObj.Title}
              style={{ width: '100%', maxWidth: 250, borderRadius: 8, marginBottom: 16 }}
            />
          )}
          <div className="detail-item"><strong>Year:</strong> {detailsObj.Year}</div>
          <div className="detail-item"><strong>Rated:</strong> {detailsObj.Rated}</div>
          <div className="detail-item"><strong>Released:</strong> {detailsObj.Released}</div>
          <div className="detail-item"><strong>Runtime:</strong> {detailsObj.Runtime}</div>
          <div className="detail-item"><strong>Genre:</strong> {detailsObj.Genre}</div>
          <div className="detail-item"><strong>Director:</strong> {detailsObj.Director}</div>
          <div className="detail-item"><strong>Writer:</strong> {detailsObj.Writer}</div>
          <div className="detail-item"><strong>Actors:</strong> {detailsObj.Actors}</div>
          <div className="detail-item"><strong>Plot:</strong> {detailsObj.Plot}</div>
          <div className="detail-item"><strong>Language:</strong> {detailsObj.Language}</div>
          <div className="detail-item"><strong>Country:</strong> {detailsObj.Country}</div>
          <div className="detail-item"><strong>Awards:</strong> {detailsObj.Awards}</div>
          {detailsObj.Ratings && Array.isArray(detailsObj.Ratings) && (
            <div className="detail-item">
              <strong>Ratings:</strong>
              <ul>
                {detailsObj.Ratings.map((r, i) => (
                  <li key={i}>{r.Source}: {r.Value}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="detail-item"><strong>IMDB Rating:</strong> {detailsObj.imdbRating}</div>
          <div className="detail-item"><strong>IMDB Votes:</strong> {detailsObj.imdbVotes}</div>
          <div className="detail-item"><strong>Type:</strong> {detailsObj.Type}</div>
          <div className="detail-item"><strong>BoxOffice:</strong> {detailsObj.BoxOffice}</div>
          <div className="detail-item"><strong>Production:</strong> {detailsObj.Production}</div>
          <div className="detail-item"><strong>Website:</strong> {detailsObj.Website}</div>
        </div>
      </div>
    </div>
  );
};

export default PopUpModel;
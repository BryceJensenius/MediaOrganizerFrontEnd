import React from 'react';
import '../styles/style.css';

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
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        maxWidth: 400,
        borderRadius: 16,
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        padding: 0,
        background: 'linear-gradient(135deg, #f8fafc 80%, #e0e7ef 100%)'
      }}>
        <button className="close-button" onClick={onClose} style={{
          background: 'none',
          border: 'none',
          color: '#888',
          fontWeight: 'bold',
          fontSize: 28,
          position: 'absolute',
          top: 10,
          right: 18,
          cursor: 'pointer',
          zIndex: 2
        }}>&times;</button>
        <div className="details-container" style={{ padding: 24 }}>
          <h2 style={{
            marginTop: 0,
            marginBottom: 12,
            fontWeight: 700,
            fontSize: 24,
            color: '#1a3a5d',
            textAlign: 'center'
          }}>
            {detailsObj.Title || "Movie Details"}
          </h2>
          {detailsObj.Poster && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <img
                src={detailsObj.Poster}
                alt={detailsObj.Title}
                style={{
                  width: '100%',
                  maxWidth: 180,
                  borderRadius: 10,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.10)'
                }}
              />
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <div className="detail-item" style={{ flex: '1 1 45%' }}><strong>Year:</strong> {detailsObj.Year}</div>
            <div className="detail-item" style={{ flex: '1 1 45%' }}><strong>Rated:</strong> {detailsObj.Rated}</div>
            <div className="detail-item" style={{ flex: '1 1 45%' }}><strong>Released:</strong> {detailsObj.Released}</div>
            <div className="detail-item" style={{ flex: '1 1 45%' }}><strong>Runtime:</strong> {detailsObj.Runtime}</div>
            <div className="detail-item" style={{ flex: '1 1 100%' }}><strong>Genre:</strong> {detailsObj.Genre}</div>
            <div className="detail-item" style={{ flex: '1 1 100%' }}><strong>Director:</strong> {detailsObj.Director}</div>
            <div className="detail-item" style={{ flex: '1 1 100%' }}><strong>Writer:</strong> {detailsObj.Writer}</div>
            <div className="detail-item" style={{ flex: '1 1 100%' }}><strong>Actors:</strong> {detailsObj.Actors}</div>
            <div className="detail-item" style={{ flex: '1 1 100%' }}><strong>Plot:</strong> {detailsObj.Plot}</div>
            <div className="detail-item" style={{ flex: '1 1 45%' }}><strong>Language:</strong> {detailsObj.Language}</div>
            <div className="detail-item" style={{ flex: '1 1 45%' }}><strong>Country:</strong> {detailsObj.Country}</div>
            <div className="detail-item" style={{ flex: '1 1 100%' }}><strong>Awards:</strong> {detailsObj.Awards}</div>
            {detailsObj.Ratings && Array.isArray(detailsObj.Ratings) && (
              <div className="detail-item" style={{ flex: '1 1 100%' }}>
                <strong>Ratings:</strong>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {detailsObj.Ratings.map((r, i) => (
                    <li key={i}>{r.Source}: {r.Value}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="detail-item" style={{ flex: '1 1 45%' }}><strong>IMDB Rating:</strong> {detailsObj.imdbRating}</div>
            <div className="detail-item" style={{ flex: '1 1 45%' }}><strong>IMDB Votes:</strong> {detailsObj.imdbVotes}</div>
            <div className="detail-item" style={{ flex: '1 1 45%' }}><strong>Type:</strong> {detailsObj.Type}</div>
            <div className="detail-item" style={{ flex: '1 1 45%' }}><strong>BoxOffice:</strong> {detailsObj.BoxOffice}</div>
            <div className="detail-item" style={{ flex: '1 1 100%' }}><strong>Production:</strong> {detailsObj.Production}</div>
            <div className="detail-item" style={{ flex: '1 1 100%' }}><strong>Website:</strong> {detailsObj.Website}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpModel;
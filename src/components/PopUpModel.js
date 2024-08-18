import React, { useState } from 'react';
import MovieDetailsModal from '../components/MovieDetailsModal.js'; // Adjust the import path if needed
import '../styles/style.css'; // Import your CSS file

const PopUpModel = () => {
  const [extraDetailsVisible, setExtraDetailsVisible] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]); // Movie details array
  const [moviePosterUrl, setMoviePosterUrl] = useState('');

  // Function to extract poster URL from movieDetails
  const extractPosterUrl = () => {
    const posterDetail = movieDetails.find(detail => detail.startsWith('Poster:'));
    if (posterDetail) {
      return posterDetail.split('Poster:')[1].trim();
    }
    return '';
  };

  // Update poster URL whenever movieDetails change
  React.useEffect(() => {
    setMoviePosterUrl(extractPosterUrl());
  }, [movieDetails]);

  return (
    <div>
      {/* Your component's content */}
      <button onClick={() => setExtraDetailsVisible(true)}>Show Details</button>

      {/* Movie Details Modal */}
      <MovieDetailsModal
        isVisible={extraDetailsVisible}
        details={movieDetails}
        onClose={() => setExtraDetailsVisible(false)}
        poster={moviePosterUrl}
      />
    </div>
  );
};

export default PopUpModel;

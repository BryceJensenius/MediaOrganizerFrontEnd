import './App.css';
import NavBar from './components/NavBar';
import MediaHandler from './components/MediaHandler';
import MediaWatchlist from './components/MediaWatchlist';
import BoardGameHandler from './components/BoardGameHandler';
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
//stop stealing my code with inspect 
//     .-''''''-.
//   .'          '.
//  /   O      O   \
// :           `    :
// |                |   
// :    .------.    :
//  \  '        '  /
//   '.          .'
//     '-......-'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<MediaHandler />} />
          <Route path="/watchlist" element={<MediaWatchlist />} />
          <Route path="/boardGames" element={<BoardGameHandler />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

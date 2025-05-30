import './App.css';
import Appbar from './components/Appbar';
import NavBar from './components/NavBar';
import MediaHandler from './components/MediaHandler';
import MediaWatchlist from './components/MediaWatchlist';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
        <Appbar />
        <Routes>
          <Route path="/" element={<MediaHandler />} />
          <Route path="/watchlist" element={<MediaWatchlist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

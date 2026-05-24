import './App.css';
import NavBar from './components/NavBar';
import MediaHandler from './components/MediaHandler';
import MediaWatchlist from './components/MediaWatchlist';
import BoardGameHandler from './components/BoardGameHandler';
import AboutMe from './components/AboutMe';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
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
  return ( // ProtectedRoute ensures only authenticated users can access these routes, otherwise redirect to login
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<AboutMe />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/media" element={<ProtectedRoute><MediaHandler /></ProtectedRoute>} />
          <Route path="/watchlist" element={<ProtectedRoute><MediaWatchlist /></ProtectedRoute>} />
          <Route path="/boardGames" element={<ProtectedRoute><BoardGameHandler /></ProtectedRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Appbar from './components/Appbar';
import Student from './components/Student'
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
    <Appbar/>
    <Student/>
    </div>
  );
}

export default App;

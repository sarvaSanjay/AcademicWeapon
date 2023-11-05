import '../App.css';
import Home from './Home';
import Quiz from './Quiz';
import Flashcard from "./Flashcard";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import FlashCards from "./FlashCards";
import WebcamCapture from "./WebcamCapture";
const SAMPLE= [{question:"Hi",answer:"1"},{question:"Bye",answer:"2"}]

function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;

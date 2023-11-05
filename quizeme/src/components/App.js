import '../App.css';
import Home from './Home';
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
    <Router>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/flashcards' element={<FlashCards  flashcards={SAMPLE} />}></Route>
            <Route path="/webcam" element={<WebcamCapture />}></Route>
            <Route
                path="*"
                element={<Navigate to="/" />}
            />
         </Routes>
    </Router>
  );
}

export default App;

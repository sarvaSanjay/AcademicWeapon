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


function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            {/*<Route path='/flashcards' element={<FlashCards  flashcards={SAMPLE} />}></Route>*/}
            <Route path="/webcam" element={<WebcamCapture />}></Route>
         </Routes>
    </Router>
  );
}

export default App;

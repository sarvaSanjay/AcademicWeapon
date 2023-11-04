import '../App.css';
import Home from './Home';
import Flashcard from "./Flashcard";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Home />}></Route>
         </Routes>
    </Router>
  );
}

export default App;

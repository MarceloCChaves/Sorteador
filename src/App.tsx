import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Update from './pages/Update';
import "./index.css";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/update/:id" element={<Update/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

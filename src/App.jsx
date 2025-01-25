
import { Appbar } from "./components/Appbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ForeCast from "./pages/Forecast";
import Future from "./pages/Future";
import Instant from "./pages/Instant";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Appbar />
              <Routes>
                <Route path="/*" element={<NotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/instant" element={<Instant />} />
                <Route path="/future" element={<Future />} />
                <Route path="/forecast" element={<ForeCast />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
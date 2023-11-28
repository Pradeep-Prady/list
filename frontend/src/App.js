import Create from "./components/Create";
import ListDetails from "./components/ListDetails";
import Lists from "./components/Lists";
import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="w-full h-screen ">
          <Navbar />
          <Routes>
            <Route path="/" element={<Lists />} />
            <Route path="/create" element={<Create />} />
            <Route path="/:id/details" element={<ListDetails />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

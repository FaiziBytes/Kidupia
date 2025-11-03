import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/layout";
import Home from "./Home-page/home";
import Shop from "./Shop/Shop";
import Admindashboard from "./Admin/admindashboard";

function App() {
  return (
    <div className="font-['Jost']">
      <BrowserRouter>
        <Routes>
          {/* Layout Routes (with navbar, footer, etc.) */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}/> {/* ✅ Home loads first */}
            <Route path="/Home/shop" element={<Shop />} />
          </Route>

          {/* Admin route (no layout) */}
          <Route path="/admin/*" element={<Admindashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
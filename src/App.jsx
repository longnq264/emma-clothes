import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./components/Test";
import HomePage from "./pages";
import Blogs from "./pages/Blogs";
import Layout from "./Layout.jsx";
import NoPage from "./pages/NoPage";
import Contact from "./pages/Contact.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


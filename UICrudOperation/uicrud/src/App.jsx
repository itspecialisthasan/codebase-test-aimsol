import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Product from "./pages/product/Product";
import Contact from "./pages/contact/Contact";

import { Provider } from "./utils/Context";

import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Provider>
        <Navbar />

        <div className="App__main-page-content">
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Provider>
    </>
  );
}

export default App;

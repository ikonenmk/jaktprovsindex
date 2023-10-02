import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";
import Contact from "./components/Contact";
import Button from "../src/components/Button";
import Search from "../src/components/Search";
function App() {
    return (
			<Routes>
				<Route path="/" element={< Home />} />
				<Route path="/add" element={< Add />} />
				<Route path="/contact" element={< Contact />} />
				<Route path="/button" element={< Button />} />
				<Route path="/search" element={< Search /> } />
			</Routes>
    );
}

export default App;

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";
import Button from "../src/components/Button";
import Search from "../src/components/Search";
import Accordion from "../src/components/Accordion";
import AllDogs from "../src/components/AllDogs";
import AddRresult from "../src/components/AddResult";
function App() {
    return (
			<Routes>
			<Route path="/" element={< Home />} />
			<Route path="/add" element={< Add />} />
			<Route path="/button" element={< Button />} />
			<Route path="/search" element={< Search />} />
			<Route path="/accordion" element={< Accordion />} />
			<Route path="/alldogs" element={< AllDogs />} />
			<Route path="/addresult" element={< AddRresult />} />
			</Routes>
    );
}

export default App;


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import AllDogs from "../src/components/AllDogs";
import AddRresult from "../src/components/AddResult";
import NavBarTop from "../src/components/NavBarTop";
import NavBarBottom from "../src/components/NavBarBottom";
function App() {
	return (
		<>
			<NavBarTop />
			<Routes>
				<Route path="/" element={< AllDogs />} />
				<Route path="/alldogs" element={< AllDogs />} />
				<Route path="/addresult" element={< AddRresult />} />
			</Routes>
			<NavBarBottom />
		</>
    );
}

export default App;

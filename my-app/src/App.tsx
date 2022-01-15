import "./App.css";
import { Route, Routes } from "react-router-dom";
import BankDetails from "./Components/BankDetails/BankDetails";
import Favourite from "./Components/Favourite/Favourite";
import "bootstrap/dist/css/bootstrap.min.css";
import DashBoard from "./Components/DashBoard/DashBoard";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Routes>
					<Route path="/all-banks" element={<DashBoard />} />
					<Route
						path="/bank-details/{ifsc_code}"
						element={<BankDetails />}
					/>
					<Route path="/about" element={<Favourite />} />
				</Routes>
			</header>
		</div>
	);
}

export default App;

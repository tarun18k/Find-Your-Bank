import { Navigate, Route, Routes } from "react-router-dom";
import BankDetails from "./Components/BankDetails/BankDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import DashBoard from "./Components/DashBoard/DashBoard";
function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Routes>
					<Route path="/all-banks" element={ <DashBoard /> } />
					<Route
						path="/bank-details/:ifsc"
						element={ <BankDetails /> }></Route>
					<Route path="*" element={ <Navigate to="/all-banks" /> } />
				</Routes>
			</header>
		</div>
	);
}

export default App;

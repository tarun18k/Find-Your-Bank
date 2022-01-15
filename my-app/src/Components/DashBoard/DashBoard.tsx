import { useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./DashBoard.module.css";
import { MultiSelect } from "react-multi-select-component";

const DashBoard = () => {
	const [city, setCity] = useState("MUMBAI");
	const options = ["MUMBAI", "DELHI", "BANGALORE", "ALIGARH", "HYDERABAD"];
	const [bankLists, setBankLists] = useState([]);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [searchOption, setSerachOption] = useState([]);
	const searchOptions = [
		{
			label: "IFSC",
			value: "ifsc",
		},
		{
			label: "Branch",
			value: "branch",
		},
		{
			label: "Bank Name",
			value: "bank_name",
		},
	];

	const changeOption = (e: any) => {
		setCity(e.target.value);
		fetchBanks(city);
	};
	const fetchBanks = (city: string) => {
		fetch("https://vast-shore-74260.herokuapp.com/banks?city=" + city)
			.then((res) => res.json())
			.then(
				(data) => {
					setIsLoaded(true);
					setBankLists(data);
					console.log(data);
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			);
	};
	const setSearchFilter = (e: any) => {
		console.log(e.target.value);
	};
	return (
		<main className={styles.DashBoard}>
			<header className={styles.flex}>
				<div className="Heading"> Find Your Bank</div>
				<div className={styles.flex}>
					<div className="cityFilter">
						<label id="city">Select City</label>
						<Form.Select
							aria-label="Default select example"
							onChange={(e) => {
								changeOption(e);
							}}>
							{options.map((city: string) => (
								<option value={city}>{city}</option>
							))}
						</Form.Select>
					</div>
					<div className="searchFilter">
						<label id="searchOptions">
							Select Search Options
						</label>
						<MultiSelect
							options={searchOptions}
							value={searchOption}
							onChange={setSerachOption}
							labelledBy="Select"
						/>
					</div>
					<div className={styles.searchDiv}>
						<label className="searchValue"> Search </label>
						<input
							type="text"
							id="searchValue"
							placeholder="Search..."
							onKeyUp={setSearchFilter}
						/>
					</div>
				</div>
			</header>
		</main>
	);
};

export default DashBoard;

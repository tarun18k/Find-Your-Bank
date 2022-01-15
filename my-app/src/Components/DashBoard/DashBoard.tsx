import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./DashBoard.module.css";
import { MultiSelect } from "react-multi-select-component";
import BanksList from "../BanksList/BanksList";

const DashBoard = () => {
	const [city, setCity] = useState("MUMBAI");
	const options = ["MUMBAI", "DELHI", "BANGALORE", "ALIGARH", "HYDERABAD"];
	const [bankLists, setBankLists] = useState([]);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [searchOption, setSearchOption] = useState([]);
	const [currentBanks, setCurrentBanks] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	var cityChanged = true;
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

	useEffect(() => {
		fetchBanks(city);
	}, [city]);

	useEffect(() => {
		setSearchFilter();
	}, [searchOption, searchValue]);

	const changeOption = (e: any) => {
		setCity(e.target.value);
	};

	const changeSearchValue = (e: any) => {
		setSearchValue(e.target.value);
	};

	const fetchBanks = (city: string) => {
		console.log(city);
		fetch("https://vast-shore-74260.herokuapp.com/banks?city=" + city)
			.then((res) => res.json())
			.then(
				(data) => {
					setIsLoaded(true);
					setBankLists(data);
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			);
	};

	useEffect(() => {
		if (searchOption.length > 0 && searchValue.length > 0) {
			console.log("if");
			setSearchFilter();
		} else {
			console.log("else");
			setCurrentBanks(bankLists);
		}
	}, [bankLists]);

	const setSearchFilter = () => {
		var result: any = [];
		bankLists.forEach((bank) => {
			searchOptions.forEach((searchKey: any) => {
				if (bank[searchKey.value] === searchValue) {
					result.push(bank);
				}
			});
		});
		if (searchOption.length === 0 || searchValue.length === 0) {
			result = bankLists;
		}
		setCurrentBanks(result);
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
							onChange={setSearchOption}
							labelledBy="Select"
						/>
					</div>
					<div className={styles.searchDiv}>
						<label className="searchValue"> Search </label>
						<input
							type="text"
							id="searchValue"
							placeholder="Search..."
							onChange={(e) => {
								changeSearchValue(e);
							}}
						/>
					</div>
				</div>
			</header>
			<div className={styles.table}>
				<BanksList banks={currentBanks}></BanksList>
			</div>
		</main>
	);
};

export default DashBoard;

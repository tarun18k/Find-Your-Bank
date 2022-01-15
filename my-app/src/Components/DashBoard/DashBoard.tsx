import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./DashBoard.module.css";
import { MultiSelect } from "react-multi-select-component";
import BanksList from "../BanksList/BanksList";
import Loader from "../Loader/Loader";
import { BankService } from "../../Services/BankService";

const DashBoard = () => {
	const [city, setCity] = useState("MUMBAI");
	const options = ["MUMBAI", "DELHI", "BANGALORE", "ALIGARH", "HYDERABAD"];
	const [bankLists, setBankLists] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchOption, setSearchOption] = useState([]);
	const [currentBanks, setCurrentBanks] = useState([]);
	const [searchValue, setSearchValue] = useState("");
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
		setIsLoading(true);
		BankService.getBanks(city).then(
			(data) => {
				setIsLoading(false);
				setBankLists(data);
			},
			(error) => {
				setIsLoading(false);
				setError(error);
			}
		);
	};

	useEffect(() => {
		if (searchOption.length > 0 && searchValue.length > 0) {
			setSearchFilter();
		} else {
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
		<>
			<main className={styles.DashBoard}>
				<header className={styles.flex}>
					<div className={styles.Heading}>
						{" "}
						<h2>Find Your Bank</h2>
					</div>
					<div className={styles.flex}>
						<div className="cityFilter">
							<label id="city">SelectCity</label>
							<Form.Select
								aria-label="Default select example"
								onChange={(e) => {
									changeOption(e);
								}}>
								{options.map((city: string) => (
									<option value={city}>
										{city}
									</option>
								))}
							</Form.Select>
						</div>
						<div className="searchFilter">
							<label id="searchOptions">
								SelectSearchOptions
							</label>
							<MultiSelect
								options={searchOptions}
								value={searchOption}
								onChange={setSearchOption}
								labelledBy="Select"
							/>
						</div>
						<div className={styles.searchDiv}>
							<label className="searchValue">
								{" "}
								Search{" "}
							</label>
							<input
								className={styles.searchInput}
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
				{isLoading === true ? (
					<Loader />
				) : (
					<div className={styles.table}>
						<BanksList banks={currentBanks}></BanksList>
					</div>
				)}
			</main>
		</>
	);
};

export default DashBoard;

import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./DashBoard.module.css";
import { MultiSelect } from "react-multi-select-component";
import BanksList from "../BanksList/BanksList";
import Loader from "../Loader/Loader";
import { BankService } from "../../Services/BankService";
import { Cache } from "../../Models/BankDetailsInterface";
import Badge from 'react-bootstrap/Badge'
import { CITY_OPTIONS, SEARCH_OPTIONS } from "../../Utils/constants";

const CACHE: Cache = {
	currentCity: 'MUMBAI',
	fields: []
};

const DashBoard = () => {
	const options = CITY_OPTIONS;
	const searchOptions = SEARCH_OPTIONS;

	const [city, setCity] = useState(CACHE.currentCity);
	const [bankLists, setBankLists] = useState([]);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [searchOption, setSearchOption] = useState([]);
	const [currentBanks, setCurrentBanks] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		if (CACHE.fields.find(obj => {
			return obj.city === city;
		})) {
			const details = CACHE.fields.find(obj => {
				return obj.city === city;
			})
			setBankLists(details?.data);
			setIsLoading(false);
		} else {
			fetchBanks(city);
		}
	}, [city]);

	useEffect(() => {
		setSearchFilter();
	}, [searchOption, searchValue]);

	useEffect(() => {
		if (searchOption.length > 0 && searchValue.length > 0) {
			setSearchFilter();
		} else {
			setCurrentBanks(bankLists);
		}
	}, [bankLists]);

	/**
	 * Sets the selected city option
	 * @param e Change event
	 */
	const changeOption = (e: any) => {
		setCity(e.target.value);
		CACHE.currentCity = e.target.value;
	};

	/**
	 * Sets the search value
	 */
	const changeSearchValue = (e: any) => {
		setSearchValue(e.target.value);
	};

	/**
	 * Triggers the API to fetch banks list of selected city
	 * @param city Selected city
	 */
	const fetchBanks = (city: string) => {
		setIsLoading(true);

		BankService.getBanks(city).then(
			(data) => {
				setIsLoading(false);
				setBankLists(data);
				CACHE.fields.push({ city: city, data: data });
			},
			(error) => {
				setIsLoading(false);
				setError(error);
			}
		);
	};

	/**
	 * Disable or enable search bar based on search options filter
	 * @returns condition of disable
	 */
	const isDisabledSearch = () => {
		if (searchOption.length === 0) {
			return true;
		}
		return false;
	}

	/**
	 * Sets the filtered banks based on the search options and search value
	 */
	const setSearchFilter = () => {
		var result: any = [];

		const lowerCasedInput = searchValue.toLowerCase();

		result = bankLists.filter(item => {
			return searchOption.some((key: any) => {
				const regex = new RegExp(`^${lowerCasedInput.trim()}`, 'i');
				return regex.test(item[key.value]);
			}
			);
		});

		if (searchOption.length === 0 || searchValue.length === 0) {
			result = bankLists;
		}

		setCurrentBanks(result);
	};


	return (
		<>
			<main className={ styles.dashBoard }>
				<header className={ styles.flex }>
					<div>
						<h1><Badge bg="secondary">Find Your Bank</Badge></h1>
					</div>
					<div className={ styles.flex }>
						<div className="cityFilter">
							<label id="city">City</label>
							<Form.Select
								className={ styles.width }
								aria-label="Default select example"
								value={ city }
								onChange={ (e) => {
									changeOption(e);
								} }>
								{ options.map((city: string) => (
									<option key={ city } value={ city }>
										{ city }
									</option>
								)) }
							</Form.Select>
						</div>
						<div className="searchFilter">
							<label id="searchOptions">
								Search Options
							</label>
							<MultiSelect
								className={ styles.width }
								options={ searchOptions }
								value={ searchOption }
								onChange={ setSearchOption }
								labelledBy="Select"
							/>
						</div>
						<div className={ styles.searchDiv }>
							<label className="searchValue">
								{ " " }
								Search{ " " }
							</label>
							<input
								className={ styles.searchInput }
								type="text"
								id="searchValue"
								placeholder="Search..."
								disabled={ isDisabledSearch() }
								onChange={ (e) => {
									changeSearchValue(e);
								} }
							/>
						</div>
					</div>
				</header>

				{ isLoading === true ? (
					<Loader />
				) : (
					error === '' ? (
						<div className={ styles.table }>
							<BanksList banks={ currentBanks }></BanksList>
						</div>) :
						(<div className={ styles.noDataFound }><h2>{ error }</h2></div>)
				) }
			</main>
		</>
	);
};

export default DashBoard;

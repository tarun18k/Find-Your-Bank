export const BankService = {
	/**
	 * Gets the banks list data
	 * @param city Selected city
	 * @returns Promise to get banks
	 */
	getBanks: (city: string) => {
		return fetch(
			`https://bank-query.herokuapp.com/banks?city=${city}`
		).then((res) => res.json());
	},
};

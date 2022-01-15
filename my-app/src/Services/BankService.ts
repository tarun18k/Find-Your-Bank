export const BankService = {
	getBanks: (city: string) => {
		return fetch(
			`https://vast-shore-74260.herokuapp.com/banks?city=${city}`
		).then((res) => res.json());
	},
};

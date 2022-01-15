import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { BanksListProps } from "../../Models/Props";
const BanksList: React.FC<BanksListProps> = ({ banks }: BanksListProps) => {
	// const [error, setError] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);
	// const [banks, setBanks] = useState([]);
	// useEffect(() => {
	// 	fetch("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
	// 		.then((res) => res.json())
	// 		.then(
	// 			(data) => {
	// 				setIsLoaded(true);
	// 				setBanks(data);
	// 			},
	// 			(error) => {
	// 				setIsLoaded(true);
	// 				setError(error);
	// 			}
	// 		);
	// }, []);
	// if (error) {
	// 	return <div>Error: {error}</div>;
	// } else if (!isLoaded) {
	// 	return <div>Loading...</div>;
	// } else {
	var headerKeys: string[] = [];
	if (banks[0]) headerKeys = Object.keys(banks[0]);
	return (
		<Table striped bordered hover responsive="md" variant="dark">
			<thead>
				<tr>
					{headerKeys.map((key: string) => (
						<th key={key}>{key.toLocaleUpperCase()}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{banks.map((bank: any, index) => (
					<tr key={index}>
						{headerKeys.map((key: string, index) =>
							key === "address" ? (
								<td
									key={index + key}
									className="address">
									{bank[headerKeys[index]]}
								</td>
							) : (
								<td key={index + key}>
									{bank[headerKeys[index]]}
								</td>
							)
						)}
					</tr>
				))}
				<tr></tr>
			</tbody>
		</Table>
		// <ul>
		// 	{banks.map((user: any) => (
		// 		<li key={user.ifsc}>{user.bank_name}</li>
		// 	))}
		// </ul>
	);
};
// };
export default BanksList;

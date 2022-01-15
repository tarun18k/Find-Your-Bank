import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { BankDetails } from "../../Models/BankDetailsInterface";
import { BanksListProps } from "../../Models/Props";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import styles from "./BanksList.module.css";
const BanksList: React.FC<BanksListProps> = ({ banks }: BanksListProps) => {
	var headerKeys: string[] = [];
	const [activePage, setActivePage] = useState(1);
	const [paginatedRecords, setPaginatedRecords] =
		useState<BankDetails[]>(banks);
	const [pageCount, setPageCount] = useState(0);
	useEffect(() => {
		const rem = banks.length % 10 === 0 ? 0 : 1;
		setPageCount(Math.floor(banks.length / 10) + rem);
		changePageNumber(1);
	}, [banks]);
	if (banks[0]) headerKeys = Object.keys(banks[0]);
	const changePageNumber = (activePage: number) => {
		const records = banks.filter(
			(bank: BankDetails, index: number) =>
				index + 1 > activePage * 10 - 10 &&
				index + 1 <= activePage * 10
		);
		setPaginatedRecords(records);
		setActivePage(activePage);
	};
	return (
		<div>
			{paginatedRecords.length === 0 && <h2>No Data Found</h2>}
			<Table striped bordered hover responsive="md" variant="dark">
				<thead>
					<tr>
						{headerKeys.map((key: string) => (
							<th key={key}>{key.toLocaleUpperCase()}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{paginatedRecords.map((bank: any, index: number) => (
						<tr key={index}>
							{headerKeys.map((key: string, index) =>
								key == "address" ? (
									<td
										key={index + key}
										className={styles.address}
										style={{ width: "150px" }}>
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
			<PaginationComponent
				pageCount={pageCount}
				changePageNumber={changePageNumber}
				activePage={activePage}
			/>
		</div>
	);
};
export default BanksList;

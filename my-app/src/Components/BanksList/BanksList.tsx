import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { BankDetails } from "../../Models/BankDetailsInterface";
import { BanksListProps } from "../../Models/Props";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import styles from "./BanksList.module.css";
import { useNavigate } from "react-router-dom";

const BanksList: React.FC<BanksListProps> = ({ banks }: BanksListProps) => {
	var headerKeys: string[] = [];

	const navigate = useNavigate();

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

	/**
	 * Emits the event to parent to set selected page
	 * @param activePage Current selected page
	 */
	const changePageNumber = (activePage: number) => {
		const records = banks.filter(
			(bank: BankDetails, index: number) =>
				index + 1 > activePage * 10 - 10 &&
				index + 1 <= activePage * 10
		);

		setPaginatedRecords(records);
		setActivePage(activePage);
	};

	/**
	 * Navigates to the selected Bank Details Screen
	 * @param ifsc IFSC Code of selected bank
	 * @param bank Data of selected bank
	 */
	const goToBank = (ifsc: string, bank: any) => {
		navigate(`/bank-details/${ifsc}`, { state: bank });
	};

	return (
		<div>
			{ paginatedRecords.length === 0 && <div className={ styles.noDataFound }><h2>No Data Found</h2></div> }

			<Table striped bordered table-ellipsis hover responsive="md" className={ styles.layout } >
				<thead>
					<tr>
						{ headerKeys.map((key: string) => (
							<th key={ key }>{ key.toLocaleUpperCase() }</th>
						)) }
					</tr>
				</thead>
				<tbody>
					{ paginatedRecords.map((bank: any, index: number) => (
						<tr className={ styles.pointer }
							onClick={ () => goToBank(bank["ifsc"], bank) }
							key={ index }>
							{ headerKeys.map((key: string, index) =>
								key === "address" ? (
									<td className={ styles.cell }
										key={ index + key }
									>
										{ bank[headerKeys[index]] }
									</td>
								) : (
									<td key={ index + key }>
										{ bank[headerKeys[index]] }
									</td>
								)
							) }
						</tr>
					)) }
				</tbody>
			</Table>

			<div className={ styles.leftAlign }>
				<PaginationComponent
					pageCount={ pageCount }
					changePageNumber={ changePageNumber }
					activePage={ activePage }
				/>
			</div>
		</div>
	);
};
export default BanksList;

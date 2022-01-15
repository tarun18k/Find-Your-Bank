import React from "react";
import { BankDetailsProps } from "../../Models/Props";
import styles from "./BankDetailsCard.module.css";
import Table from "react-bootstrap/Table";
const BankDetailsCard: React.FC<BankDetailsProps> = ({
	bank,
}: BankDetailsProps) => (
	<div className={styles.BankDetailsCard}>
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>Detail_TYPE</th>
					<th>DETAIL_VALUE</th>
				</tr>
			</thead>
			<tbody>
				{Object.keys(bank).map((key: any, index) => {
					<tr key={index}>
						<td key={key}>{key}/</td>
						<td key={index + key}></td>
					</tr>;
				})}
			</tbody>
		</Table>
	</div>
);

export default BankDetailsCard;

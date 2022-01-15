import { Navigate, useLocation, useNavigate } from "react-router-dom";
import styles from "./BankDetails.module.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
const BankDetails = () => {
	const bank: any = useLocation().state;
	const headerKeys = Object.keys(bank);
	const navigation = useNavigate();

	const goToDashboard = () => {
		navigation("/all-banks");
	};

	return (
		<div>
			<h2>BANK DETAILS</h2>{" "}
			<Button onClick={goToDashboard} variant="primary">
				Go To DashBoard
			</Button>
			<div className={styles.BankDetailsCard}>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Detail_TYPE</th>
							<th>DETAIL_VALUE</th>
						</tr>
					</thead>
					<tbody>
						{headerKeys.map((key: any, index) => (
							<tr key={index}>
								<td key={key}>{key}</td>
								<td key={index + key}>{bank[key]}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default BankDetails;

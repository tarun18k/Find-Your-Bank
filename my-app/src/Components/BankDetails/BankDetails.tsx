import { useLocation, useNavigate } from "react-router-dom";
import styles from "./BankDetails.module.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge'

const BankDetails = () => {
	const bank: any = useLocation().state;
	const headerKeys = Object.keys(bank);
	const navigation = useNavigate();

	/**
	 * Navigates to the Dashboard screen
	 */
	const goToDashboard = () => {
		navigation("/all-banks");
	};

	return (
		<div className={ styles.mainContainer }>
			<div className={ styles.main }>
				<div className={ styles.flex }>
					<h1><Badge bg="secondary">BANK DETAILS</Badge></h1>
					<Button onClick={ goToDashboard } variant="outline-secondary">
						<b>GO TO DASHBOARD</b>
					</Button>
				</div>
				<div className={ styles.bankDetailsCard }>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Detail_TYPE</th>
								<th>DETAIL_VALUE</th>
							</tr>
						</thead>
						<tbody>
							{ headerKeys.map((key: any, index) => (
								<tr key={ index }>
									<td key={ key }>{ key }</td>
									<td key={ index + key }>{ bank[key] }</td>
								</tr>
							)) }
						</tbody>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default BankDetails;

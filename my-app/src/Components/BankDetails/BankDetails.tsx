import React from "react";
import { Link } from "react-router-dom";
import styles from "./BankDetails.module.css";

const BankDetails = () => (
	<div className={styles.BankDetails}>
		<h2>Welcome To Groww</h2>
		<nav>
			<Link to="/">BanksList</Link>
		</nav>
	</div>
);

export default BankDetails;

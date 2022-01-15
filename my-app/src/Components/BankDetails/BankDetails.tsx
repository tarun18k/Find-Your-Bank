import React from "react";
import { Link } from "react-router-dom";
import BankDetailsCard from "../BankDetailsCard/BankDetailsCard";
import styles from "./BankDetails.module.css";

const BankDetails = () => {
	const currentBank: any = {
		ifsc: "ABHY0065001",
		bank_id: "60",
		branch: "RTGS-HO",
		address: "ABHYUDAYA BANK BLDG., B.NO.71, NEHRU NAGAR, KURLA (E), MUMBAI-400024",
		city: "MUMBAI",
		district: "GREATER MUMBAI",
		state: "MAHARASHTRA",
		bank_name: "ABHYUDAYA COOPERATIVE BANK LIMITED",
	};
	return (
		<div>
			<h2>BANK DETAILS</h2>
			<BankDetailsCard bank={currentBank}></BankDetailsCard>
		</div>
	);
};

export default BankDetails;

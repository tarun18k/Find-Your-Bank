import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "./Loader.module.css";
const Loader = () => (
	<div className={styles.Loader}>
		<Spinner
			animation="border"
			variant="primary"
			className={styles.spinnerCustom}
		/>
	</div>
);
export default Loader;

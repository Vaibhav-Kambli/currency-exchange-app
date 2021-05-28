import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	rates: {
		padding: "5px",
		margin: "20px",
	},
}));

const Rates = ({ rates }) => {
	const classes = useStyles();
	return (
		<>
			{rates.map((rate) => (
				<h2 className={classes.rates} key={rate}>
					Current 1 CAD to INR rate: ₹
					<span style={{ color: "#df1b1b" }}>{rate.INR}</span>
				</h2>
			))}
		</>
	);
};

export default Rates;

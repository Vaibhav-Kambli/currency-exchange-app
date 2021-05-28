import React from "react";
import "./rates.css";

const Rates = ({ rates }) => {
	return (
		<>
			{/* <h4>{rates}</h4> */}
			{rates.map((rate) => (
				<h2 className="rates" key={rate}>
					Current 1 CAD to INR rate: ₹
					<span style={{ color: "#df1b1b" }}>{rate.INR}</span>
				</h2>
			))}
		</>
	);
};

export default Rates;

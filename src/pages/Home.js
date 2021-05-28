import React, { useEffect, useState } from "react";
import axios from "axios";
import Rates from "../components/Rates";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AutorenewIcon from "@material-ui/icons/Autorenew";

export const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		background: "whitesmoke",
		alignItems: "center",
	},
	header: {
		textAlign: "center",
		marginTop: theme.spacing(4),
	},
	header2: {
		margin: theme.spacing(3),
	},

	input: {
		margin: theme.spacing(2),
		marginRight: theme.spacing(2),
		alignItems: "center",
	},

	icon: {
		marginTop: theme.spacing(4),
		margin: theme.spacing(1),
	},

	inputField: {
		margin: theme.spacing(1),
		marginTop: theme.spacing(2),
		paddingTop: "5px",
		alignItems: "center",
		textAlign: "center",
		justifyContent: "center",
	},

	formControl: {
		margin: theme.spacing(2),
		minWidth: 300,

		maxWidth: 800,
	},
	submit: {
		width: "20%",

		marginTop: "20px",
		fontWeight: "bold",
		padding: theme.spacing(1),
	},
}));

const Home = () => {
	const classes = useStyles();
	const [rates, setRates] = useState([{}]);
	const [loading, setLoading] = useState(false);

	const [currency1, setCurrency1] = useState("");
	const [currency2, setCurrency2] = useState("");
	const [amount1, setAmount1] = useState("");
	const [convertedAmount, setConvertedAmount] = useState("");

	const API_KEY = process.env.REACT_APP_API_KEY;

	useEffect(() => {
		const getRates = async () => {
			setLoading(true);
			try {
				const data = await axios.get(
					"https://api.exchangerate-api.com/v4/latest/CAD"
				);

				setRates([data.data.rates]);
				setLoading(false);
			} catch (err) {
				console.log(err);
			}
		};

		getRates();
	}, []);

	const currencies = [
		"CAD",
		"INR",
		"USD",
		"AED",
		"EGP",
		"EUR",
		"GBP",
		"HKD",
		"JMD",
		"MVR",
	];

	const handleCurrency1 = (e) => {
		setCurrency1(e.target.value);
	};
	const handleCurrency2 = (e) => {
		setCurrency2(e.target.value);
	};

	const handleSubmit = () => {
		if (!currency1 || !currency2) {
			alert("Please fill all the fields");
		} else {
			let num = parseInt(amount1);

			getConversion(num.toFixed(2), currency1, currency2);
		}
	};

	const resetData = () => {
		setAmount1("");
		setCurrency1("");
		setCurrency2("");
		setConvertedAmount("");
	};

	const getConversion = async (amt, curr1, curr2) => {
		try {
			const data = await axios.get(
				`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${curr1}/${curr2}/${amt}`
			);

			setConvertedAmount(data.data.conversion_result);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={classes.root}>
			<h1 className={classes.header}>Exchange rate app</h1>

			{loading ? <h3>Loading...</h3> : <Rates rates={rates} />}

			<h2 className={classes.header2}>Currency Conversion</h2>
			<form className={classes.input}>
				<TextField
					className={classes.inputField}
					label="Amount"
					placeholder="Enter Amount"
					value={amount1}
					required
					onChange={(e) => setAmount1(e.target.value)}
				/>
				<FormControl className={classes.formControl}>
					<InputLabel>From</InputLabel>
					<Select
						id="demo-mutiple-name"
						required
						onChange={handleCurrency1}
						value={currency1}
						input={<Input />}
					>
						{currencies.map((currency) => (
							<MenuItem key={currency} value={currency}>
								{currency}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<AutorenewIcon
					color="primary"
					className={classes.icon}
					fontSize="large"
				/>

				<FormControl className={classes.formControl}>
					<InputLabel>To</InputLabel>
					<Select
						onChange={handleCurrency2}
						required
						value={currency2}
						input={<Input />}
					>
						{currencies.map((currency) => (
							<MenuItem key={currency} value={currency}>
								{currency}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</form>

			{convertedAmount && <h3>Conversion Result: {convertedAmount}</h3>}
			<Button
				className={classes.submit}
				color="primary"
				variant="contained"
				type="submit"
				onClick={handleSubmit}
			>
				Submit
			</Button>
			<Button
				className={classes.submit}
				color="primary"
				variant="contained"
				type="submit"
				onClick={resetData}
			>
				Reset
			</Button>
		</div>
	);
};

export default Home;

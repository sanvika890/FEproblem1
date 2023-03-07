import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Head from "next/head";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const GamePage = () => {
	const [planets, setPlanets] = useState([{ name: "", distance: 0 }]);
	const [vehicles, setVehicles] = useState([{ name: "", total_no: 0, max_distance: 0, speed: 0 }]);
	const [vehicleQuantity, setVehicleQuantity] = useState([{ name: "", total_no: 0, max_distance: 0, speed: 0 }]);
	const [loadingPlanets, setLoadingPlanets] = useState<boolean>(false);
	const [vehicleLoading, setVehicleLoading] = useState<boolean>(false);
	const [planetOne, setPlanetOne] = useState({ name: "", distance: 0 });
	const [planetTwo, setPlanetTwo] = useState({ name: "", distance: 0 });
	const [planetThree, setPlanetThree] = useState({ name: "", distance: 0 });
	const [planetFour, setPlanetFour] = useState({ name: "", distance: 0 });
	const [enableNext, setEnableNext] = useState<boolean[]>([false, false, false, false]);

	const fetchPlanets = async () => {
		setLoadingPlanets(true);
		try {
			const response = await axios.get("https://findfalcone.geektrust.com/planets");
			setPlanets(response.data);
			setLoadingPlanets(false);
		} catch (error) {
			console.log(error);
			setLoadingPlanets(false);
		}
	};

	const fetchVehicles = async () => {
		setVehicleLoading(true);
		try {
			const response = await axios.get("https://findfalcone.geektrust.com/vehicles");
			setVehicles(response.data);
			setVehicleQuantity(response.data);
			setVehicleLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchPlanets();
		fetchVehicles();
	}, []);

	const handlePlanetOneChange = (e, newValue) => {
		const dist = planets.filter((item) => item.name == newValue);
		setPlanetOne({ distance: dist[0].distance, name: newValue });
		const setBoolean = enableNext;
		setBoolean[0] = true;
		setEnableNext(setBoolean);
	};

	const handlePlanetTwoChange = (e, newValue) => {
		const dist = planets.filter((item) => item.name == newValue);
		setPlanetTwo({ distance: dist[0].distance, name: newValue });
		const setBoolean = enableNext;
		setBoolean[1] = true;
		setEnableNext(setBoolean);
	};
	const handlePlanetThreeChange = (e, newValue) => {
		const dist = planets.filter((item) => item.name == newValue);
		setPlanetThree({ distance: dist[0].distance, name: newValue });
		const setBoolean = enableNext;
		setBoolean[2] = true;
		setEnableNext(setBoolean);
	};
	const handlePlanetFourChange = (e, newValue) => {
		const dist = planets.filter((item) => item.name == newValue);
		setPlanetFour({ distance: dist[0].distance, name: newValue });
		const setBoolean = enableNext;
		setBoolean[3] = true;
		setEnableNext(setBoolean);
	};
	const handleClick = () => {
		console.log(planetOne, planetTwo, planetThree, planetFour);
	};

	const handleVehicleOneChange = (e) => {};

	return (
		<>
			<Head>
				<title>Game Page</title>
			</Head>
			{loadingPlanets ? (
				"Loading..."
			) : (
				<Grid container justifyContent="center" spacing={5}>
					<Grid item>
						<Typography variant="h4">Find Falcone!</Typography>
					</Grid>
					<Grid container item justifyContent="center" alignItems="center" spacing={5}>
						<Grid item lg={2} md={2} sm={3} xs={12}>
							<Autocomplete
								sx={{ width: 300 }}
								options={planets.map((item) => item.name)}
								value={planetOne.name == "" ? planets[0].name : planetOne.name}
								onChange={handlePlanetOneChange}
								renderInput={(params) => <TextField {...params} label="Planet 1" />}
							/>
							<FormControl sx={{ visibility: enableNext[0] ? "visible" : "hidden" }}>
								<FormLabel id="demo-radio-buttons-group-label">Vehicle</FormLabel>
								<RadioGroup onChange={handleVehicleOneChange}>
									{!vehicleLoading
										? vehicles.map((item) => (
												<FormControlLabel
													disabled={item.max_distance < planetOne.distance && item.total_no > 0}
													key={item.name}
													value={item.name}
													control={<Radio />}
													label={item.name + " " + "Left: " + item.total_no}
												/>
										  ))
										: null}
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item lg={2} md={2} sm={3} xs={12}>
							<Autocomplete
								sx={{ width: 300 }}
								options={planets.map((item) => item.name)}
								disabled={enableNext[0] ? false : true}
								value={planetTwo.name == "" ? planets[0].name : planetTwo.name}
								onChange={handlePlanetTwoChange}
								renderInput={(params) => <TextField {...params} label="Planet 2" />}
							/>
							<FormControl sx={{ visibility: enableNext[1] ? "visible" : "hidden" }}>
								<FormLabel id="demo-radio-buttons-group-label">Vehicle</FormLabel>
								<RadioGroup>
									{vehicles.map((item) => (
										<FormControlLabel
											disabled={item.max_distance < planetTwo.distance}
											key={item.name}
											value={item.name}
											control={<Radio />}
											label={item.name + " " + "Left: " + item.total_no}
										/>
									))}
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item lg={2} md={2} sm={3} xs={12}>
							<Autocomplete
								sx={{ width: 300 }}
								options={planets.map((item) => item.name)}
								disabled={enableNext[1] ? false : true}
								value={planetThree.name == "" ? planets[0].name : planetThree.name}
								onChange={handlePlanetThreeChange}
								renderInput={(params) => <TextField {...params} label="Planet 3" />}
							/>
							<FormControl sx={{ visibility: enableNext[2] ? "visible" : "hidden" }}>
								<FormLabel id="demo-radio-buttons-group-label">Vehicle</FormLabel>
								<RadioGroup>
									{!vehicleLoading
										? vehicles.map((item) => (
												<FormControlLabel
													disabled={item.max_distance < planetThree.distance}
													key={item.name}
													value={item.name}
													control={<Radio />}
													label={item.name + " " + "Left: " + item.total_no}
												/>
										  ))
										: null}
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item lg={2} md={2} sm={3} xs={12}>
							<Autocomplete
								sx={{ width: 300 }}
								options={planets.map((item) => item.name)}
								disabled={enableNext[2] ? false : true}
								value={planetFour.name == "" ? planets[0].name : planetFour.name}
								onChange={handlePlanetFourChange}
								renderInput={(params) => <TextField {...params} label="Planet 4" />}
							/>
							<FormControl sx={{ visibility: enableNext[3] ? "visible" : "hidden" }}>
								<FormLabel id="demo-radio-buttons-group-label">Vehicle</FormLabel>
								<RadioGroup>
									{!vehicleLoading
										? vehicles.map((item) => (
												<FormControlLabel
													disabled={item.max_distance < planetFour.distance}
													key={item.name}
													value={item.name}
													control={<Radio />}
													label={item.name + " " + "Left: " + item.total_no}
												/>
										  ))
										: null}
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item>
							<Button onClick={handleClick}>Done</Button>
						</Grid>
					</Grid>
				</Grid>
			)}
		</>
	);
};

export default GamePage;

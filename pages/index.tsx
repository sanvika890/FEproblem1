import React from "react";
import LandingPage from "../src/components/LandingPage";
import Head from "next/head";

function App() {
	return (
		<>
			<Head>
				<title>Finding Falcone</title>
			</Head>
			<div>
				<LandingPage />
			</div>
		</>
	);
}

export default App;

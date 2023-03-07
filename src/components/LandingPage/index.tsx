import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

const LandingPage = () => {
	const router = useRouter();
	return (
		<Grid container justifyContent="center" alignItems="center" direction="column" spacing={5} sx={{ height: "100vh" }}>
			<Grid item>
				<Avatar alt="Finding Queen Falcone" src="/QueenImage.png" sx={{ width: 100, height: 100 }} />
			</Grid>
			<Grid item>
				<Typography variant="h1">Finding Falcone!</Typography>
			</Grid>
			<Grid item>
				<Typography variant="h6">Lets find Queen Falcone!</Typography>
			</Grid>
			<Grid item>
				<Button variant="contained" onClick={() => router.push("/GamePage")}>
					Lets Go
				</Button>
			</Grid>
		</Grid>
	);
};

export default LandingPage;

import "./App.css";
import NavBar from "./components/NavBar";
import React, { useState } from "react";
import UserForm from "./components/UserForm";
import Admin from "./components/Admin";
import axios from "axios";
import { Tabs } from "antd";
import SyncLoader from "react-spinners/SyncLoader";
var url = "http://localhost:5000/";

function App() {
	const [admin, setAdmin] = useState(false);
	const [bookings, setBookings] = useState([]);
	const [buttonText, setButtonTextx] = useState("Admin Page");
	const [loading, setLoading] = useState(false);

	const fetchBookings = async () => {
		if (admin === true) {
			setAdmin(false);
			setButtonTextx("Admin Page");
			return;
		}
		setLoading(true);
		try {
			const { data } = await axios.get(`${url}api/v1/getbookings`);
			console.log(data.message);
			setBookings(data.message);
			setAdmin(true);
			setButtonTextx("Booking Page");
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	const lowkey = (x) => {
		setAdmin(false);
		setButtonTextx(x);
	};

	return (
		<div className="App">
			<NavBar></NavBar>
			<div>
				<Tabs
					className="ml-3 mr-3 bs"
					onChange={fetchBookings}
					centered
				>
					<Tabs.TabPane tab="Booking Page" key="1">
						<div className="poop">
							<SyncLoader
								color="black"
								loading={loading}
								margin={2}
							/>
						</div>
						<UserForm />
					</Tabs.TabPane>
					<Tabs.TabPane tab="Admin Page" key="2">
						<div className="poop">
							<SyncLoader
								color="black"
								loading={loading}
								margin={2}
							/>
						</div>
						<div id="adminSection">
							<Admin Bookings={bookings} purple={lowkey} />
						</div>
					</Tabs.TabPane>
				</Tabs>
				{/* <button onClick={fetchBookings} id="toggle">
					{buttonText}
				</button> */}
			</div>
			{/* <div>
				{admin === false ? (
					<UserForm />
				) : (
					<Admin Bookings={bookings} purple={lowkey} />
				)}
			</div> */}
		</div>
	);
}

export default App;

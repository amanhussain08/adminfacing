import React from "react";
import Booking from "./Booking.jsx";
import "./Admin.css";
function Admin(props) {
	const lowkey = (x) => {
		props.purple(x);
	};
	return (
		<div className="bookingContainer">
			{props.Bookings.map((booking) => {
				console.log(booking._id);
				return (
					<Booking
						booking={booking}
						purple={lowkey}
						key={booking._id}
					/>
				);
			})}
		</div>
	);
}

export default Admin;

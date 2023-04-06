import React from "react";
import Booking from "./Booking.jsx";
import "./Admin.css";
function Admin(props) {
	return (
		<div className="bookingContainer">
			{props.Bookings.map((booking) => {
				console.log(booking._id);
				return (
					<Booking
						booking={booking}
						key={booking._id}
					/>
				);
			})}
		</div>
	);
}

export default Admin;

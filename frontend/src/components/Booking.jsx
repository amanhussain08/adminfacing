import React, { useState } from "react";
import "./Booking.css";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from "react-toastify";
var url = "http://localhost:5000/";

function Booking(props) {
	const [room, setRoom] = useState(props.booking.room);
	const [roomNumber, setRoomNumber] = useState(props.booking.roomNumber);
	const [email, setEmail] = useState(props.booking.email);
	const price = props.booking.price;
	const [checkInDate, setCheckInDate] = useState(props.booking.checkInDate);
	const [checkOutDate, setCheckOutDate] = useState(
		props.booking.checkOutDate
	);
	const [loading, setLoading] = useState(false);
	const id = props.booking._id;

	const success = (msg) => {
		toast.success(msg);
	};

	const err = (msg) => {
		toast.error(msg);
	};

	const updateBooking = async () => {
		const d = {
			room,
			roomNumber,
			email,
			price,
			start: checkInDate,
			end: checkOutDate,
			id,
		};
		setLoading(true);
		try {
			const { data } = await axios.post(`${url}api/v1/updatebooking`, d);

			if (data.error == 201) {
				success(data.message);
			} else {
				err("Something went wrong");
			}
		} catch (error) {
			err("Something went wrong");
		}
		setLoading(false);
	};

	const deleteBooking = async () => {
		const d = {
			id,
		};
		setLoading(true);
		try {
			const { data } = await axios.post(`${url}api/v1/deletebooking`, d);
			if (data.error == 201) {
				success(data.message);
				props.purple("Admin Page->");
			} else {
				err("Something went wrong");
			}
		} catch (error) {
			err("Something went wrong");
		}
		setLoading(false);
	};

	return (
		<div>
			<div className="booking">
				<div className="poop">
					<SyncLoader color="white" loading={loading} margin={5} />
				</div>
				<ToastContainer />
				<div className="mt-2 mb-2">
					Booking Id: {props.booking._id}{" "}
				</div>
				<div className="mt-2 mb-2">
					Room Type:{" "}
					<input
						type="text"
						value={room}
						onChange={(e) => {
							setRoom(e.target.value);
						}}
					/>{" "}
				</div>
				<div className="mt-2 mb-2">
					Room Number:{" "}
					<input
						type="text"
						value={roomNumber}
						onChange={(e) => {
							setRoomNumber(e.target.value);
						}}
					/>{" "}
				</div>
				<div className="mt-2 mb-2">
					Check In Time And Date:{" "}
					<input
						type="text"
						value={checkInDate}
						onChange={(e) => {
							setCheckInDate(e.target.value);
						}}
					/>{" "}
				</div>
				<div className="mt-2 mb-2">
					Check Out Time And Date:{" "}
					<input
						type="text"
						value={checkOutDate}
						onChange={(e) => {
							setCheckOutDate(e.target.value);
						}}
					/>{" "}
				</div>
				<div className="mt-2 mb-2">Price: {price} </div>
				<div className="mt-2 mb-2">
					Email:{" "}
					<input
						type="text"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>{" "}
				</div>
				<div className="mt-4">
					<button
						className="btn btn-secondary btn-sm"
						onClick={updateBooking}
					>
						Update
					</button>{" "}
					<button
						className="btn btn-danger btn-sm"
						onClick={deleteBooking}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default Booking;

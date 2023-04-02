import React, { useState } from "react";
import "./UserForm.css";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
var url = "http://localhost:5000/";
const UserForm = () => {
	let [price, setPrice] = useState("See Estimate");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [cost, setCost] = useState(0);
	const [loading, setLoading] = useState(false);

	const success = (msg) => {
		toast.success(msg, { duration: 2000 });
	};

	const err = (msg) => {
		toast.error(msg, { duration: 2000 });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const room = e.target.room.value;
		const start = e.target.start.value;
		const end = e.target.end.value;
		const roomNumber = e.target.roomNumber.value;
		const price = e.target.price.value;
		const d = {
			email,
			room,
			start,
			end,
			roomNumber,
			price,
		};
		console.log(d);
		setLoading(true);
		try {
			const { data } = await axios.post(`${url}api/v1/booking`, d);
			if (data.error == 201) {
				success(data.message);
			} else {
				err(data.message);
			}
		} catch (error) {
			err("Something went wrong");
		}
		setPrice("See Estimate");
		setStartDate("");
		setEndDate("");
		setCost(0);
		setLoading(false);
	};

	const getPrice = () => {
		console.log("hello");
		let d = new Date(startDate);
		let e = new Date(endDate);
		let diff = e.getTime() - d.getTime();
		let hours = diff / (1000 * 3600);
		setPrice(hours * cost);
		return;
	};
	return (
		<div className="mx-auto col-10 col-md-8 col-lg-4 ">
			<form className="Form" onSubmit={handleSubmit}>
				<div className="poop">
					<SyncLoader color="black" loading={loading} margin={5} />
				</div>
				<ToastContainer />
				<div className="col mb-3 mx-3 form-group">
					<label htmlFor="email">Email:</label>
					<input
						className="form-control"
						type="email"
						name="email"
						id="email"
						required
					/>
				</div>

				<div className="Rooms">
					<div className="col m-3 form-group">
						<label htmlFor="room">Select Room Type:</label>
						<select
							className="form-control"
							id="room"
							name="room"
							required
						>
							<option value="A">Type A</option>
							<option value="B">Type B</option>
							<option value="C">Type C</option>
						</select>
					</div>
					<div className="col m-3 form-group">
						<label htmlFor="roomNumber">Type Room Number:</label>
						<input
							type="text"
							name="roomNumber"
							id="roomNumber"
							className="form-control"
							required
						/>
					</div>
					<div className="col m-3 form-group">
						<label htmlFor="price">Room Price(per hour):</label>
						<input
							className="form-control"
							type="text"
							name="price"
							id="price"
							onChange={(e) => setCost(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className="Date">
					<div className="col m-3 form-group">
						<label htmlFor="start">Start Date</label>
						<input
							className="form-control"
							type="datetime-local"
							name="start"
							id="start"
							onChange={(e) => setStartDate(e.target.value)}
							required
						/>
					</div>
					<div className="col m-3 form-group">
						<label htmlFor="end">End Date</label>
						<input
							type="datetime-local"
							className="form-control"
							name="end"
							id="end"
							onChange={(e) => setEndDate(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className="Bottom m-3">
					<div className="col">
						<button
							type="submit"
							className="btn btn-primary"
							id="book"
						>
							Book Room
						</button>
					</div>
					<div className="col">
						<button
							className="btn btn-secondary"
							type="button"
							id="estimate"
							onClick={getPrice}
						>
							{price}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default UserForm;

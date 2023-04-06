import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./UserForm.css";
import Booking from "./Booking.jsx";
var url = "http://localhost:5000/";

export default function Search() {
	const [searchData, setSearchData] = useState([]);
	const [flag, setFlag] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// const roomNumber = e.target.roomNumber.value;
		const room = e.target.roomType.value;
		const info = { room };
		// console.log(info);
		try {
			const { data } = await axios.post(`${url}api/v1/findSearch`, info);
			// console.log(data.message);
			setSearchData(data.message);
			console.log(searchData);
			setFlag(true);
		} catch (error) {
			setFlag(false);
			console.log("hello");
		}
	};
	return (
		<div className="mx-auto col-10 col-md-8 col-lg-4 ">
			<form className="Form" onSubmit={handleSubmit}>
				<div className="Rooms">
					<div className="col m-3 form-group">
						<label htmlFor="roomType">Select Room Type:</label>
						<select
							className="form-control"
							id="room"
							name="roomType"
							required
						>
							<option value="A">Type A</option>
							<option value="B">Type B</option>
							<option value="C">Type C</option>
						</select>
					</div>
					{/* <div className="col m-3 form-group">
						<label htmlFor="roomNumber">Type Room Number:</label>
						<input
							type="text"
							name="roomNumber"
							id="roomNumber"
							className="form-control"
							required
						/>
					</div> */}
				</div>
				<div className="Bottom m-3">
					<div className="col">
						<button
							type="submit"
							className="btn btn-primary"
							id="book"
						>
							Find
						</button>
					</div>
				</div>
			</form>

			<div>
				{searchData.length > 0 ? (
					searchData.map((eachRoom) => {
						return (
							<Booking booking={eachRoom} key={eachRoom._id} />
						);
					})
				) : flag === true ? (
					<div>No Record Found</div>
				) : (
					""
				)}
			</div>
		</div>
	);
}

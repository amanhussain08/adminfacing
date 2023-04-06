const Booking = require("../models/Booking");
const crypto = require("crypto");
const createBooking = async (req, res) => {
	const { email, room, start, end, roomNumber, price } = req.body;
	let localstart = new Date(start);
	let localend = new Date(end);
	const id = crypto.randomBytes(5).toString("hex");

	const bookings = await Booking.find({
		$and: [
			{
				$or: [
					{
						checkInDate: {
							$gte: new Date(start),
							$lte: new Date(end),
						},
					},
					{
						checkOutDate: {
							$gte: new Date(start),
							$lte: new Date(end),
						},
					},
				],
			},
			{
				roomNumber: roomNumber,
			},
		],
	});

	if (bookings.length > 0) {
		return res.json({
			error: 401,
			message: "This room is not available for this date and time",
		});
	}

	const booking = await Booking.create({
		id,
		email,
		checkInDate: localstart,
		checkOutDate: localend,
		checkInDateNumber: localstart.getTime(),
		checkOutDateNumber: localend.getTime(),
		room,
		price,
		roomNumber,
	});

	res.json({ error: 201, message: "Room Booked Successfully" });
};

const getBookings = async (req, res) => {
	const bookings = await Booking.find({});
	res.json({ message: bookings });
};

const updateBooking = async (req, res) => {
	const { id, email, room, start, end, roomNumber, price } = req.body;
	let localstart = new Date(start);
	let localend = new Date(end);
	const booking = await Booking.findOneAndUpdate(
		{ _id: id },
		{
			email,
			checkInDate: localstart,
			checkOutDate: localend,
			checkInDateNumber: localstart.getTime(),
			checkOutDateNumber: localend.getTime(),
			room,
			price,
			roomNumber,
		}
	);
	res.json({ error: 201, message: "Booking details updated successfully" });
};

const findSearch = async (req, res) => {
	const { room, roomNumber } = req.body;
	console.log(req.body);
	console.log(room);
	console.log(roomNumber);
	const result = await Booking.find({
		// roomNumber: roomNumber,
		room: room,
	});
	res.json({ message: result });
};

const deleteBooking = async (req, res) => {
	const { id } = req.body;
	const booking = await Booking.deleteOne({ _id: id });
	res.json({ error: 201, message: "Booking deleted successfully" });
};

const temp = async (req, res) => {
	const { start, end, room, roomNumber } = req.body;

	const bookings = await Booking.find({
		$and: [
			{
				$or: [
					{
						checkInDate: {
							$gte: new Date(start),
							$lte: new Date(end),
						},
					},
					{
						checkOutDate: {
							$gte: new Date(start),
							$lte: new Date(end),
						},
					},
				],
			},
			{
				roomNumber: roomNumber,
			},
		],
	});
	res.json({ message: bookings.length });
};

module.exports = {
	createBooking,
	getBookings,
	updateBooking,
	deleteBooking,
	temp,
	findSearch,
};

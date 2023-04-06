const express = require("express");
const router = express.Router();
const {
	createBooking,
	getBookings,
	temp,
	updateBooking,
	deleteBooking,
	findSearch,
} = require("../controllers/bookingControllers");
router.post("/booking", createBooking);
router.get("/getbookings", getBookings);
router.post("/temp", temp);
router.post("/updatebooking", updateBooking);
router.post("/deletebooking", deleteBooking);
router.post("/findSearch", findSearch);

module.exports = router;

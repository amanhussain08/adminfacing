const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: false,
    lowercase: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  room: {
    type: String,
    required: true,
    trim: true,
  },
  roomNumber: {
    type: String,
    required: true,
    trim: true,
  },
  checkInDateNumber: {
    type: Number,
    required: true,
  },
  checkOutDateNumber: {
    type: Number,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);

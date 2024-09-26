const express = require("express");
const Booking = require("./models/Booking");  // Import the Booking model

const app = express();
app.use(express.json());

app.post("/checkAvailability", async (req, res) => {
    const { checkInDate, checkOutDate, roomType } = req.body;

    const conflictingBookings = await Booking.findAll({
        where: {
            roomType,
            checkInDate: { [Sequelize.Op.lt]: checkOutDate },
            checkOutDate: { [Sequelize.Op.gt]: checkInDate }
        }
    });

    res.json({ available: conflictingBookings.length === 0 });
});

app.post("/bookRoom", async (req, res) => {
    const { checkInDate, checkOutDate, roomType, guests, name, email, phone } = req.body;

    const conflictingBookings = await Booking.findAll({
        where: {
            roomType,
            checkInDate: { [Sequelize.Op.lt]: checkOutDate },
            checkOutDate: { [Sequelize.Op.gt]: checkInDate }
        }
    });

    if (conflictingBookings.length === 0) {
        await Booking.create({ checkInDate, checkOutDate, roomType, guests, name, email, phone });
        res.json({ success: true, message: "Room booked successfully!" });
    } else {
        res.json({ success: false, message: "Room is not available for the selected dates." });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const hotelRoutes = require("./routes/hotelRoutes");

const app = express();


app.use(cors());
app.use(express.json());

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

app.use("/api/hotels", hotelRoutes);

app.get("/", (req, res) => {
    res.send("Hotel Management API is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

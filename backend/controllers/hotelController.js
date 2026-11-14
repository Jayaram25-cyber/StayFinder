
const pool = require("../config/db");


// ADD HOTEL
const addHotel = async (req, res) => {
    try {
        const {
            name,
            description,
            latitude,
            longitude,
            price,
        } = req.body;

        if (
            !name?.trim() ||
            !description?.trim() ||
            latitude === undefined ||
            longitude === undefined ||
            price === undefined ||
            !req.file
        ) {
            return res.status(400).json({
                message: "All hotel fields and an image are required",
            });
        }

        const lat = Number(latitude);
        const lng = Number(longitude);
        const hotelPrice = Number(price);

        if (
            !Number.isFinite(lat) ||
            lat < -90 ||
            lat > 90 ||
            !Number.isFinite(lng) ||
            lng < -180 ||
            lng > 180 ||
            !Number.isFinite(hotelPrice) ||
            hotelPrice <= 0
        ) {
            return res.status(400).json({
                message: "Invalid latitude, longitude or price",
            });
        }

        const imagePath = `/uploads/${req.file.filename}`;

        const result = await pool.query(
            `INSERT INTO hotels
            (name, description, latitude, longitude, price, image)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                name.trim(),
                description.trim(),
                lat,
                lng,
                hotelPrice,
                imagePath,
            ]
        );

        res.status(201).json({
            message: "Hotel added successfully",
            hotel: result.rows[0],
        });

    } catch (error) {
        console.error("Error adding hotel:", error.message);

        res.status(500).json({
            message: "Internal server error",
        });
    }
};


// GET ALL HOTELS WITH SEARCH, FILTER AND PAGINATION
const getHotels = async (req, res) => {
    try {
        const {
            search = "",
            minPrice,
            maxPrice,
            limit = 6,
            offset = 0,
        } = req.query;

        const pageLimit = Number(limit);
        const pageOffset = Number(offset);

        if (
            !Number.isInteger(pageLimit) ||
            pageLimit < 1 ||
            !Number.isInteger(pageOffset) ||
            pageOffset < 0
        ) {
            return res.status(400).json({
                message: "Invalid pagination values",
            });
        }

        let query = "SELECT * FROM hotels WHERE 1=1";
        let countQuery = "SELECT COUNT(*) FROM hotels WHERE 1=1";

        const values = [];

        if (search.trim()) {
            values.push(`%${search.trim()}%`);

            query += ` AND name ILIKE $${values.length}`;
            countQuery += ` AND name ILIKE $${values.length}`;
        }

        if (minPrice !== undefined && minPrice !== "") {
            const min = Number(minPrice);

            if (!Number.isFinite(min) || min < 0) {
                return res.status(400).json({
                    message: "Invalid minimum price",
                });
            }

            values.push(min);

            query += ` AND price >= $${values.length}`;
            countQuery += ` AND price >= $${values.length}`;
        }

        if (maxPrice !== undefined && maxPrice !== "") {
            const max = Number(maxPrice);

            if (!Number.isFinite(max) || max < 0) {
                return res.status(400).json({
                    message: "Invalid maximum price",
                });
            }

            values.push(max);

            query += ` AND price <= $${values.length}`;
            countQuery += ` AND price <= $${values.length}`;
        }

        const countResult = await pool.query(countQuery, values);
        const total = Number(countResult.rows[0].count);

        const paginationValues = [...values];

        paginationValues.push(pageLimit);
        query += ` ORDER BY id ASC LIMIT $${paginationValues.length}`;

        paginationValues.push(pageOffset);
        query += ` OFFSET $${paginationValues.length}`;

        const result = await pool.query(query, paginationValues);

        res.status(200).json({
            hotels: result.rows,
            total,
        });

    } catch (error) {
        console.error("Error fetching hotels:", error.message);

        res.status(500).json({
            message: "Error fetching hotels",
        });
    }
};


// GET SINGLE HOTEL BY ID
const getHotelById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return res.status(400).json({
                message: "Invalid hotel ID",
            });
        }

        const result = await pool.query(
            "SELECT * FROM hotels WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Hotel not found",
            });
        }

        res.status(200).json({
            hotel: result.rows[0],
        });

    } catch (error) {
        console.error("Error fetching hotel:", error.message);

        res.status(500).json({
            message: "Error fetching hotel",
        });
    }
};


// UPDATE HOTEL
const updateHotel = async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return res.status(400).json({
                message: "Invalid hotel ID",
            });
        }

        const {
            name,
            description,
            latitude,
            longitude,
            price,
        } = req.body;

        if (
            !name?.trim() ||
            !description?.trim() ||
            latitude === undefined ||
            longitude === undefined ||
            price === undefined
        ) {
            return res.status(400).json({
                message: "All hotel details are required",
            });
        }

        const lat = Number(latitude);
        const lng = Number(longitude);
        const hotelPrice = Number(price);

        if (
            !Number.isFinite(lat) ||
            lat < -90 ||
            lat > 90 ||
            !Number.isFinite(lng) ||
            lng < -180 ||
            lng > 180 ||
            !Number.isFinite(hotelPrice) ||
            hotelPrice <= 0
        ) {
            return res.status(400).json({
                message: "Invalid latitude, longitude or price",
            });
        }

        const imagePath = req.file
            ? `/uploads/${req.file.filename}`
            : null;

        const result = await pool.query(
            `UPDATE hotels
             SET name = $1,
                 description = $2,
                 latitude = $3,
                 longitude = $4,
                 price = $5,
                 image = COALESCE($6, image)
             WHERE id = $7
             RETURNING *`,
            [
                name.trim(),
                description.trim(),
                lat,
                lng,
                hotelPrice,
                imagePath,
                id,
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Hotel not found",
            });
        }

        res.status(200).json({
            message: "Hotel updated successfully",
            hotel: result.rows[0],
        });

    } catch (error) {
        console.error("Error updating hotel:", error.message);

        res.status(500).json({
            message: "Internal server error",
        });
    }
};


// DELETE HOTEL
const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return res.status(400).json({
                message: "Invalid hotel ID",
            });
        }

        const result = await pool.query(
            "DELETE FROM hotels WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Hotel not found",
            });
        }

        res.status(200).json({
            message: "Hotel deleted successfully",
            hotel: result.rows[0],
        });

    } catch (error) {
        console.error("Error deleting hotel:", error.message);

        res.status(500).json({
            message: "Internal server error",
        });
    }
};


module.exports = {
    addHotel,
    getHotels,
    getHotelById,
    updateHotel,
    deleteHotel,
};

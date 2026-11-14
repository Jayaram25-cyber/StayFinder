
const express = require("express");
const multer = require("multer");
const path = require("path");

const {
    addHotel,
    getHotels,
    getHotelById,
    updateHotel,
    deleteHotel,
} = require("../controllers/hotelController");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;

    const extensionValid = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimeValid = allowedTypes.test(file.mimetype);

    if (extensionValid && mimeValid) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, PNG and WEBP images are allowed"));
    }
};

const upload = multer({
    storage,
    fileFilter,
});

router.post("/", upload.single("image"), addHotel);

router.get("/", getHotels);

router.get("/:id", getHotelById);

router.put("/:id", upload.single("image"), updateHotel);

router.delete("/:id", deleteHotel);

module.exports = router;

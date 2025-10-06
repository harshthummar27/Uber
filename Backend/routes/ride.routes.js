const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post(
  "/",
  authMiddleware.authUser,
  [
    body("pickup.address").isString().isLength({ min: 1 }),
    body("pickup.lat").isFloat(),
    body("pickup.lng").isFloat(),
    body("destination.address").isString().isLength({ min: 1 }),
    body("destination.lat").isFloat(),
    body("destination.lng").isFloat(),
  ],
  rideController.createRide
);

router.get(
  "/:rideId/distance",
  authMiddleware.authUser,
  [param("rideId").isMongoId()],
  rideController.getRideDistance
);

router.get(
  "/:rideId/fare",
  authMiddleware.authUser,
  [param("rideId").isMongoId()],
  rideController.getFare
);

module.exports = router;

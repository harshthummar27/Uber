const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middleware/auth.middleware')

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min : 3}).withMessage('Invalid Pikeup location'),
    body('destination').isString().isLength({min : 3    }).withMessage('Invalid destination add'),
    body('vehicleType').isString().isIn(['car', 'auto', 'bike']).withMessage('Invalid Vehicle type'),
    rideController.createRide
)

module.exports = router;
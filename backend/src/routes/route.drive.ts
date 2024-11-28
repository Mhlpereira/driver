// PATCH /ride/confirm 
// POST /ride/estimate 
// GET /ride/{customer_id}?driver_id={id do motorista} 

import { Router } from "express";
import { RideController } from "../ride/ride.controller";
import { DriverService } from "../driver/driver.service";
import { RideService } from "../ride/ride.service";
import { DriverController } from "../driver/driver.controller";

const router = Router();
const driverService = new DriverService(); 
const rideService = new RideService(driverService);
const rideController = new RideController(driverService, rideService);


router.post("/ride/estimate",(req, res) => {rideController.estimateRide(req, res)});
router.patch("/ride/confirm",(req, res) => {rideController.ConfirmRide(req, res)});
router.post("/ride/confirm", (req, res) => {rideController.listAllDrivers(req, res)}) ;
router.get("/ride/:customer_id",(req, res) => {rideController.getAllRidesByUser(req, res)});

export default router;
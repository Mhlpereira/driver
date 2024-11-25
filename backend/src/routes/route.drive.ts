// PATCH /ride/confirm 
// POST /ride/estimate 
// GET /ride/{customer_id}?driver_id={id do motorista} 

import { Router } from "express";
import { RideController } from "../ride/ride.controller";
import { DriverService } from "../driver/driver.service";
import { RideService } from "../ride/ride.service";

const router = Router();
const driverService = new DriverService(); 
const rideService = new RideService(driverService);
const rideController = new RideController(driverService, rideService);


router.post("/estimate",async (req, res) => {await rideController.ConfirmRide(req, res)});
router.patch("/confirm",async(req, res) => {await rideController.ConfirmRide(req, res)}); //fazer alterações no código para patch
router.get("/:customer_id",async(req, res) => {await rideController.getAllRidesByUser(req, res)})
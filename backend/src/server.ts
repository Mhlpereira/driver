import express from 'express'
import router from './routes/route.drive';
import cors from 'cors';
import { DriverService } from './driver/driver.service';
import { RideService } from './ride/ride.service';
import { RideController } from './ride/ride.controller';

const driverService = new DriverService(); 
const rideService = new RideService(driverService);
const rideController = new RideController(driverService, rideService);


const app = express();

app.use(cors({ origin: '*' }));

app.use(express.json());

app.post("/ride/estimate", (req, res) => {rideController.estimateRide(req, res)});
app.post("/ride/confirm", (req, res) => {rideController.listAllDrivers(req, res)});
app.get("/ride/:customer_id",(req, res) => {rideController.getAllRidesByUser(req, res)});
app.patch("/ride/confirm",(req, res) => {rideController.ConfirmRide(req, res)});

app.use(router);


app.listen(8080, () => {console.log('server running on port 8080')})


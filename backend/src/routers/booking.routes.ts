import expreess from 'express'
import { BookingController } from '../controllers/booking.controller';
const bookingRouter = expreess.Router();

bookingRouter.route("/getAllTerminForObject").post(
    (req, res) => new BookingController().getAllTerminForObject(req, res)
)
bookingRouter.route("/update").post(
    (req, res) => new BookingController().update(req, res)
)
bookingRouter.route("/insert").post(
    (req, res) => new BookingController().insert(req, res)
)
bookingRouter.route("/getAllTermin").get(
    (req, res) => new BookingController().getAllTermin(req, res)
)
export default bookingRouter;
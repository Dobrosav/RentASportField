"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("../controllers/booking.controller");
const bookingRouter = express_1.default.Router();
bookingRouter.route("/getAllTerminForObject").post((req, res) => new booking_controller_1.BookingController().getAllTerminForObject(req, res));
bookingRouter.route("/update").post((req, res) => new booking_controller_1.BookingController().update(req, res));
bookingRouter.route("/insert").post((req, res) => new booking_controller_1.BookingController().insert(req, res));
bookingRouter.route("/getAllTermin").get((req, res) => new booking_controller_1.BookingController().getAllTermin(req, res));
bookingRouter.route("/getInfoByIdTerm").post((req, res) => new booking_controller_1.BookingController().getInfoByIdTerm(req, res));
bookingRouter.route("/pdf").post((req, res) => new booking_controller_1.BookingController().pdf(req, res));
exports.default = bookingRouter;
//# sourceMappingURL=booking.routes.js.map
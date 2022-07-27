"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const booking_1 = __importDefault(require("../models/booking"));
class BookingController {
    constructor() {
        this.getAllTerminForObject = (req, res) => {
            let objekat = req.body.objekat;
            booking_1.default.find({ 'objekat': parseInt(objekat) }, (err, book) => {
                if (err)
                    console.log(err);
                else
                    res.json(book);
            });
        };
        this.getAllTermin = (req, res) => {
            booking_1.default.find({}, (err, booking) => {
                if (err)
                    console.error(err);
                else
                    res.json(booking);
            });
        };
        this.update = (req, res) => {
            let idterm = req.body.idterm;
            let brojOsoba = req.body.brojOsoba;
            booking_1.default.findOne({ 'idterm': parseInt(idterm) }, (err, book) => {
                if (err)
                    console.log(err);
                else {
                    if (book) {
                        booking_1.default.collection.updateOne({ 'idterm': parseInt(idterm) }, { $set: { 'capacity': brojOsoba } });
                        res.json({ 'message': 'ok' });
                    }
                    else
                        res.json({ 'message': 'error' });
                }
            });
        };
        this.insert = (req, res) => {
            let book = new booking_1.default(req.body);
            book.save().then(book => {
                res.status(200).json({ 'message': 'termin added' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
        this.getInfoByIdTerm = (req, res) => {
            let idterm = req.body.idterm;
            booking_1.default.findOne({ 'idterm': idterm }, (err, booking) => {
                if (err)
                    console.error(err);
                else
                    res.json(booking);
            });
        };
    }
}
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map
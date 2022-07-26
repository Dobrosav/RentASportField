"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Booking = new Schema({
    idterm: {
        type: Number
    },
    date: {
        type: String
    },
    timeoff: {
        type: String
    },
    timeto: {
        type: String
    },
    capacity: {
        type: Number
    },
    naziv: {
        type: String
    },
    kategorija: {
        type: String
    },
    cena: {
        type: Number
    },
    objekat: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Booking', Booking, 'bookings');
//# sourceMappingURL=booking.js.map
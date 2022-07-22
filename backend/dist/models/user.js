"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    korime: {
        type: String
    },
    lozinka: {
        type: String
    },
    grad: {
        type: String
    },
    datumRodjenja: {
        type: String
    },
    email: {
        type: String
    },
    telefon: {
        type: String
    },
    tip: {
        type: Number
    },
    valid: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('User', User, 'users');
//# sourceMappingURL=user.js.map
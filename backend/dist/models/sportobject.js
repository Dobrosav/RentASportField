"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let SportObject = new Schema({
    id: {
        type: Number
    },
    naziv: {
        type: String
    },
    kategorija: {
        type: String
    },
    adresa: {
        type: String
    },
    grad: {
        type: String
    },
    telefon: {
        type: String
    },
    email: {
        type: String
    },
    korime: {
        type: String
    }
});
exports.default = mongoose_1.default.model('SportObject', SportObject, 'sportobjects');
//# sourceMappingURL=sportobject.js.map
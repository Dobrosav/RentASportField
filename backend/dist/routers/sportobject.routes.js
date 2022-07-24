"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sportobject_controller_1 = require("../controllers/sportobject.controller");
const sportObjectRouter = express_1.default.Router();
sportObjectRouter.route("/getAllObjects").get((req, res) => new sportobject_controller_1.SportObjectController().getAllObjects(req, res));
sportObjectRouter.route("/newObject").post((req, res) => new sportobject_controller_1.SportObjectController().insertNewObject(req, res));
sportObjectRouter.route("/getAllObjectsOfOwner").post((req, res) => new sportobject_controller_1.SportObjectController().getAllObjectOfOwner(req, res));
exports.default = sportObjectRouter;
//# sourceMappingURL=sportobject.routes.js.map
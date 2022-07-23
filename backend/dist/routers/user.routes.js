"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserControler().login(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserControler().register(req, res));
userRouter.route("/kime").get((req, res) => new user_controller_1.UserControler().getAllUser(req, res));
userRouter.route("/getInvalidUser").get((req, res) => new user_controller_1.UserControler().getInvalidUsers(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map
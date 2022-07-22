"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControler = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserControler {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.korime;
            let password = req.body.lozinka;
            user_1.default.findOne({ 'korime': username, 'lozinka': password, 'valid': true }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            let user = new user_1.default(req.body);
            user.save().then(user => {
                res.status(200).json({ 'message': 'user added' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
        this.getAllUser = (req, res) => {
            user_1.default.find({}, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
    }
}
exports.UserControler = UserControler;
//# sourceMappingURL=user.controller.js.map
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
        this.getInvalidUsers = (req, res) => {
            user_1.default.find({ 'valid': false }, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.confirm = (req, res) => {
            let korime = req.body.korime;
            user_1.default.findOne({ "korime": korime }, (err, users) => {
                if (err)
                    console.log(err);
                else {
                    if (users) {
                        user_1.default.collection.updateOne({ 'korime': korime }, { $set: { 'valid': true } });
                        res.json({ 'message': 'ok' });
                    }
                    else
                        res.json({ 'message': 'error' });
                }
            });
        };
        this.update = (req, res) => {
            let korime = req.body.korime;
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            user_1.default.findOne({ "korime": korime }, (err, users) => {
                if (err)
                    console.log(err);
                else {
                    if (users) {
                        user_1.default.collection.updateOne({ 'korime': korime }, { $set: { 'ime': ime, 'prezime': prezime } });
                        res.json({ 'message': 'ok' });
                    }
                    else
                        res.json({ 'message': 'error' });
                }
            });
        };
        this.changePassword = (req, res) => {
            let korime = req.body.korime;
            let password = req.body.lozinka;
            console.log(korime + " " + password);
            user_1.default.findOne({ "korime": korime }, (err, users) => {
                if (err)
                    console.log(err);
                else {
                    if (users) {
                        user_1.default.collection.updateOne({ 'korime': korime }, { $set: { 'lozinka': password } });
                        res.json({ 'message': 'ok' });
                    }
                    else
                        res.json({ 'message': 'error' });
                }
            });
        };
        this.delete = (req, res) => {
            let korime = req.body.korime;
            user_1.default.findOne({ "korime": korime }, (err, users) => {
                if (err)
                    console.log(err);
                else {
                    if (users) {
                        user_1.default.collection.deleteOne({ 'korime': korime });
                        res.json({ 'message': 'ok' });
                    }
                    else
                        res.json({ 'message': 'error' });
                }
            });
        };
        this.getUserPerUsername = (req, res) => {
            let korime = req.body.korime;
            user_1.default.findOne({ "korime": korime }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
    }
}
exports.UserControler = UserControler;
//# sourceMappingURL=user.controller.js.map
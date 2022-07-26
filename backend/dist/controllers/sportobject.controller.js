"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportObjectController = void 0;
const sportobject_1 = __importDefault(require("../models/sportobject"));
class SportObjectController {
    constructor() {
        this.getAllObjects = (req, res) => {
            sportobject_1.default.find({}, (err, so) => {
                if (err)
                    console.log(err);
                else
                    res.json(so);
            });
        };
        this.insertNewObject = (req, res) => {
            let sportObject = new sportobject_1.default(req.body);
            sportObject.save().then(sportObject => {
                res.status(200).json({ 'message': 'object added' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
        this.getAllObjectOfOwner = (req, res) => {
            let korime = req.body.korime;
            sportobject_1.default.find({ 'korime': korime }, (err, so) => {
                if (err)
                    console.log(err);
                else
                    res.json(so);
            });
        };
        this.getById = (req, res) => {
            let id = req.body.id;
            sportobject_1.default.findOne({ 'id': parseInt(id) }, (err, so) => {
                if (err)
                    console.error(err);
                else
                    res.json(so);
            });
        };
    }
}
exports.SportObjectController = SportObjectController;
//# sourceMappingURL=sportobject.controller.js.map
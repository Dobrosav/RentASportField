import * as express from 'express'
import SportObject from '../models/sportobject'

export class SportObjectController {
    getAllObjects = (req: express.Request, res: express.Response) => {
        SportObject.find({}, (err, so) => {
            if (err) console.log(err)
            else res.json(so)
        })
    }
    insertNewObject = (req: express.Request, res: express.Response) => {
        let sportObject = new SportObject(req.body)
        sportObject.save().then(
            sportObject => {
                res.status(200).json({ 'message': 'object added' })
            }).catch(err => {
                res.status(400).json({ 'message': 'error' })
            })
    }
    getAllObjectOfOwner = (req: express.Request, res: express.Response) => {
        let korime = req.body.korime
        SportObject.find({ 'korime': korime }, (err, so) => {
            if (err) console.log(err)
            else res.json(so)
        })
    }
    getById = (req: express.Request, res: express.Response) => {
        let id = req.body.id
        SportObject.findOne({ 'id': parseInt(id) }, (err, so) => {
            if (err) console.error(err)
            else res.json(so)

        })
    }
}
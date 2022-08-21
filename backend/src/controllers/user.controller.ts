import * as express from 'express'
import User from '../models/user';

export class UserControler {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.korime;
        let password = req.body.lozinka;
        User.findOne({ 'korime': username, 'lozinka': password, 'valid': true }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }
    register = (req: express.Request, res: express.Response) => {
        let user = new User(req.body)
        user.save().then(
            user => {
                res.status(200).json({ 'message': 'user added' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' })
            }
            )
    }
    getAllUser = (req: express.Request, res: express.Response) => {
        User.find({}, (err, users) => {
            if (err) console.log(err)
            else res.json(users)
        })
    }
    getInvalidUsers = (req: express.Request, res: express.Response) => {
        User.find({ 'valid': false }, (err, users) => {
            if (err) console.log(err)
            else res.json(users)
        })
    }
    confirm = (req: express.Request, res: express.Response) => {
        let korime = req.body.korime
        User.findOne({ "korime": korime }, (err, users) => {
            if (err) console.log(err)
            else {
                if (users) {
                    User.collection.updateOne({ 'korime': korime }, { $set: { 'valid': true } });
                    res.json({ 'message': 'ok' })
                }
                else
                    res.json({ 'message': 'error' })
            }
        })
    }
    update = (req: express.Request, res: express.Response) => {
        let korime = req.body.korime
        let ime = req.body.ime
        let prezime = req.body.prezime
        User.findOne({ "korime": korime }, (err, users) => {
            if (err) console.log(err)
            else {
                if (users) {
                    User.collection.updateOne({ 'korime': korime }, { $set: { 'ime': ime, 'prezime': prezime } });
                    res.json({ 'message': 'ok' })
                }
                else
                    res.json({ 'message': 'error' })
            }
        })
    }
    changePassword = (req: express.Request, res: express.Response) => {
        let korime = req.body.korime
        let password = req.body.lozinka
        User.findOne({ "korime": korime }, (err, users) => {
            if (err) console.log(err)
            else {
                if (users) {
                    User.collection.updateOne({ 'korime': korime }, { $set: { 'lozinka': password } });
                    res.json({ 'message': 'ok' })
                }
                else
                    res.json({ 'message': 'error' })
            }
        })

    }
    delete = (req: express.Request, res: express.Response) => {
        let korime = req.body.korime
        User.findOne({ "korime": korime }, (err, users) => {
            if (err) console.log(err)
            else {
                if (users) {
                    User.collection.deleteOne({ 'korime': korime });
                    res.json({ 'message': 'ok' })
                }
                else
                    res.json({ 'message': 'error' })
            }
        })
    }
    getUserPerUsername = (req: express.Request, res: express.Response) => {
        let korime = req.body.korime
        User.findOne({ "korime": korime }, (err, user) => {
            if (err) console.log(err)
            else res.json(user)
        })
    }
}
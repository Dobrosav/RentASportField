import * as express from 'express'
import Booking from '../models/booking'

export class BookingController {
    getAllTerminForObject = (req: express.Request, res: express.Response) => {
        let objekat = req.body.objekat
        Booking.find({ 'objekat': parseInt(objekat) }, (err, book) => {
            if (err) console.log(err)
            else res.json(book)
        })
    }
    getAllTermin = (req: express.Request, res: express.Response) => {
        Booking.find({}, (err, booking) => {
            if (err) console.error(err);
            else res.json(booking)
        })
    }
    update = (req: express.Request, res: express.Response) => {
        let idterm = req.body.idterm
        let brojOsoba = req.body.brojOsoba
        Booking.findOne({ 'idterm': parseInt(idterm) }, (err, book) => {
            if (err) console.log(err)
            else {
                if (book) {
                    Booking.collection.updateOne({ 'idterm': parseInt(idterm) }, { $set: { 'capacity': brojOsoba } })
                    res.json({ 'message': 'ok' })
                }
                else res.json({ 'message': 'error' })
            }
        })
    }
    insert = (req: express.Request, res: express.Response) => {
        let book = new Booking(req.body)
        book.save().then(
            book => {
                res.status(200).json({ 'message': 'termin added' })
            }).catch(err => {
                res.status(400).json({ 'message': 'error' })
            })
    }
    getInfoByIdTerm = (req: express.Request, res: express.Response) => {
        let idterm = req.body.idterm
        Booking.findOne({ 'idterm': idterm }, (err, booking) => {
            if (err) console.error(err);
            else res.json(booking)
        })
    }
}

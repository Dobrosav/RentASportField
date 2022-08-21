import * as express from 'express'
import nodemailer from 'nodemailer'
import jsPDF from 'jspdf'
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
    pdf = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime
        let prezime = req.body.prezime
        let cenaosoba = req.body.cenaosoba
        let brojOsoba = req.body.brojOsoba
        let date = req.body.date
        let vremeod = req.body.vremeod
        let vremedo = req.body.vremedo
        let naziv = req.body.naziv
        let mail = req.body.email
        let telefon = req.body.telefon
        let user = req.body.user
        let mailk = req.body.emailk
        let lang=req.body.lang
        if(lang=="en")
            var textm="Dear Sir/Madam \n Attached is a pre-calculation \n Best regards"
        else
            textm="Postovani/a \n U prilogu se nalazi predracun  \n Srdacan pozdrav"
        let nazivpdf = "predracun" + user + ".pdf"
        var pdf = new jsPDF()
        pdf.text("PODACI O UPLATIOCU", 10, 10);
        let text: string
        text = ime + " " + prezime + "\n" + "cena:" + cenaosoba + "\n"
        text += "broj osoba:" + brojOsoba + "\n" + "datum:" + date + "\n" + "vreme:" + vremeod + "-" + vremedo + "\n"
        text+="PODACI O PRIMAOCU\n"
        text+="mail "+mail+" naziv objekta "+naziv+" telefon:"+telefon
        pdf.text(text,10,20)
        pdf.save(nazivpdf)
        const tranporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
                user: "****",
                pass: "****"
            }
        })
        const email = {
            from: "vlaskovicdodo98@outlook.com",
            to: mailk,
            subject: "Predracun za sportski objekat",
            text: textm,
            attachments: [{
                filename: nazivpdf,
                path: './'+nazivpdf,
                contentType: 'application/pdf'
            }]
        }
        tranporter.sendMail(email).catch(err => {
            console.log(err)
        })
        res.json({ 'message': "ok" });

    }
}

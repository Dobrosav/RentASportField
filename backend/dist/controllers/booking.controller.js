"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const jspdf_1 = __importDefault(require("jspdf"));
const booking_1 = __importDefault(require("../models/booking"));
class BookingController {
    constructor() {
        this.getAllTerminForObject = (req, res) => {
            let objekat = req.body.objekat;
            booking_1.default.find({ 'objekat': parseInt(objekat) }, (err, book) => {
                if (err)
                    console.log(err);
                else
                    res.json(book);
            });
        };
        this.getAllTermin = (req, res) => {
            booking_1.default.find({}, (err, booking) => {
                if (err)
                    console.error(err);
                else
                    res.json(booking);
            });
        };
        this.update = (req, res) => {
            let idterm = req.body.idterm;
            let brojOsoba = req.body.brojOsoba;
            booking_1.default.findOne({ 'idterm': parseInt(idterm) }, (err, book) => {
                if (err)
                    console.log(err);
                else {
                    if (book) {
                        booking_1.default.collection.updateOne({ 'idterm': parseInt(idterm) }, { $set: { 'capacity': brojOsoba } });
                        res.json({ 'message': 'ok' });
                    }
                    else
                        res.json({ 'message': 'error' });
                }
            });
        };
        this.insert = (req, res) => {
            let book = new booking_1.default(req.body);
            book.save().then(book => {
                res.status(200).json({ 'message': 'termin added' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
        this.getInfoByIdTerm = (req, res) => {
            let idterm = req.body.idterm;
            booking_1.default.findOne({ 'idterm': idterm }, (err, booking) => {
                if (err)
                    console.error(err);
                else
                    res.json(booking);
            });
        };
        this.pdf = (req, res) => {
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let cenaosoba = req.body.cenaosoba;
            let brojOsoba = req.body.brojOsoba;
            let date = req.body.date;
            let vremeod = req.body.vremeod;
            let vremedo = req.body.vremedo;
            let naziv = req.body.naziv;
            let mail = req.body.email;
            let telefon = req.body.telefon;
            let user = req.body.user;
            let mailk = req.body.emailk;
            let nazivpdf = "predracun" + user + ".pdf";
            var pdf = new jspdf_1.default();
            pdf.text("PODACI O UPLATIOCU", 10, 10);
            let text;
            text = ime + " " + prezime + "\n" + "cena:" + cenaosoba + "\n";
            text += "broj osoba:" + brojOsoba + "\n" + "datum:" + date + "\n" + "vreme:" + vremeod + "-" + vremedo + "\n";
            text += "PODACI O PRIMAOCU\n";
            text += "mail " + mail + " naziv objekta " + naziv + " telefon:" + telefon;
            pdf.text(text, 10, 20);
            pdf.save(nazivpdf);
            const tranporter = nodemailer_1.default.createTransport({
                service: "hotmail",
                auth: {
                    user: "vlaskovicdodo98@outlook.com",
                    pass: "partizan98"
                }
            });
            const email = {
                from: "vlaskovicdodo98@outlook.com",
                to: mailk,
                subject: "Predracun za sportski objekat",
                text: "Postovani/a \n U prilogu se nalazi predracun  \n Srdacan pozdrav",
                attachments: [{
                        filename: nazivpdf,
                        path: './' + nazivpdf,
                        contentType: 'application/pdf'
                    }]
            };
            tranporter.sendMail(email).catch(err => {
                console.log(err);
            });
            res.json({ 'message': "ok" });
        };
    }
}
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map
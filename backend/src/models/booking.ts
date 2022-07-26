import mongoose from "mongoose";
const Schema=mongoose.Schema
let Booking=new Schema({
    idterm:{
        type:Number
    },
    date:{
        type:String
    },
    timeoff:{
        type:String
    },
    timeto:{
        type:String
    },
    capacity:{
        type:Number
    },
    naziv:{
        type:String
    },
    kategorija:{
        type:String
    },
    cena:{
        type:Number
    },
    objekat:{
        type:String
    }
})
export default mongoose.model('Booking',Booking,'bookings')
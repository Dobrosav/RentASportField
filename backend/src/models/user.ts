import  mongoose  from "mongoose";
const Schema=mongoose.Schema;

let User=new Schema({
    ime:{
        type:String
    },
    prezime:{
        type:String
    },
    korime:{
        type:String
    },
    lozinka:{
        type:String
    },
    grad:{
        type:String
    },
    datumRodjenja:{
        type:String
    },
    email:{
        type:String
    },
    telefon:{
        type:String
    },
    tip:{
        type:Number
    },
    valid:{
        type:Boolean
    }
})
export default mongoose.model('User',User,'users');